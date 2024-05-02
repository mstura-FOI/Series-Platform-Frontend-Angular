import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../enviroments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  isChecked: boolean = false;
   
 async checked(){
  if(this.isChecked == true){
    this.isChecked = false
    let podaci = await fetch(environment.rest+"/totp_reset?id="+this.id)
    this.formaPrijava.get('totp_enabled')?.setValue("Niste uključili totp");
    console.log("true")
    window.location.reload()
  }else{
    this.isChecked = true
    console.log(false)
    let podaci = await fetch(environment.rest+"/totp?id="+this.id)
    window.location.reload()
  }
 }
  formaPrijava: FormGroup;
  id:number = 0
  constructor(private fb: FormBuilder,private recaptcha: ReCaptchaV3Service) {
    this.formaPrijava = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      adresa: [''],
      korime: [{ value: '', disabled: true }],
      lozinka: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }, Validators.email],
      dob: [''],
      drzava: [''],
      totp_enabled: [{ value: '', disabled: true }]
    });
    
  }
 async ngOnInit(): Promise<void> {
    let korime: string = await this.getUserName()
    this.loadFormData(korime)
  }
  async loadFormData(user_name:string){
    try {
     
      const response = await fetch(environment.rest+'/baza/korisnici/'+user_name);
      const user_data = await response.json();
      
      console.log(this.isChecked)
      console.log(user_data)
      this.id = user_data.id
      this.formaPrijava.patchValue({
        ime: user_data.ime,
        prezime: user_data.prezime,
        adresa: user_data.adresa,
        dob: user_data.dob,
        drzava: user_data.drzava,
        totp_enabled: user_data.totp_enabled
      });
  
      if(user_data.totp_enabled  == 0){
        this.formaPrijava.get('totp_enabled')?.setValue("Niste uključili totp");
        console.log("gesd")
        this.isChecked = false
      }else if(user_data.totp_enabled != 0){
        console.log("421")
        this.formaPrijava.get('totp_enabled')?.setValue(user_data.totp_enabled);
        this.isChecked = true
      }
      this.formaPrijava.get('korime')?.setValue(user_data.korime);
      this.formaPrijava.get('lozinka')?.setValue(user_data.lozinka);
      this.formaPrijava.get('email')?.setValue(user_data.email);
  
    } catch (error) {
      console.error('Error fetching user data:', error);
     
    }
  }

 async onSubmit() {
  this.recaptcha.execute('importantAction')
    .subscribe(async (token: string) => {
      const korimeValue = this.formaPrijava.get('korime')?.value;
  const lozinkaValue = this.formaPrijava.get('lozinka')?.value;
  const emailValue = this.formaPrijava.get('email')?.value;

  
  const formData = {
    ...this.formaPrijava.value,
    korime: korimeValue,
    lozinka: lozinkaValue,
    email: emailValue,
    id:this.id,
    token: token
  };

  let povratni = await fetch(environment.rest+`/baza/korisnici/${korimeValue}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});


if (povratni.status === 200) {
    window.location.reload()
} else {
    
}
  
    }
    )
  

  }
  async getUserName(): Promise<string>{
    let korisnik = await fetch(environment.rest+'/baza/korisnikPodaci');
    let korpodaci = await JSON.parse(await korisnik.text());
    return korpodaci.korime
  }
}
