

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../enviroments/environment.prod';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router,private recaptcha:ReCaptchaV3Service) {
   
  }
  username: string = '';
  password: string = '';
  successful: boolean = false;
  totp:string = ''
  

  resolved(captchaResponse: string | null){
      this.recaptcha
  }
  
async githubLogin(){
  window.location.href = environment.rest+'/auth';
}
 async onSubmit() {
  if(this.totp == ''){
    this.totp = "0"
  }
  console.log(this.totp)
  let tokenS
    this.recaptcha.execute('importantAction')
    .subscribe((token: string) => {
      
     
       const credentials = {
      korime: this.username,
      lozinka: this.password,
      totp: this.totp,
      token: token
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    };

    fetch(environment.rest+'/prijava', requestOptions)
      .then(response => {
        if (!response.ok) {
         
        }
        return response.json();
      })
      .then(data => {
        console.log(data.data)
        this.router.navigate(['/'])
        
      })
      .catch(error => {
        

      });
    });
    
   
  }
  
}
