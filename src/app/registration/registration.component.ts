import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../enviroments/environment.prod';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  tip_korisnika:number | undefined
  constructor(private fb: FormBuilder,private route:Router,private recaptcha: ReCaptchaV3Service) { }

  ngOnInit(): void {
    
    this.onComponentRendered()

    this.registrationForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      lozinka: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      korime: ['', Validators.required]
    });
  }
   onComponentRendered() {
    
 
    this.tip_korisnika = parseInt(window.sessionStorage.getItem("tip")!)
    console.log(this.tip_korisnika)
  }

 async onSubmit() {
  this.recaptcha.execute('importantAction')
  .subscribe( async (token: string) => {
if (this.registrationForm?.valid) {
      const formData = {
        ...this.registrationForm.value,
        token: token
      };
    
      let povratni = await fetch(environment.rest+`/registracija`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    
    if (povratni.status === 200) {
        console.log("Uspjeh")
        this.route.navigate([''])
    } else {
        
    }
      
  }
  })

    
}
}
