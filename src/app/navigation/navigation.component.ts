import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../enviroments/environment.prod';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  tip_korisnika: number = 0;
  oauth: number  = 0
  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
        this.onComponentRendered();

      }
    });
  }
  logged(value: any): boolean{
    if(this.tip_korisnika == 0 || this.tip_korisnika == undefined && !this.ifExtension(value)){
        return true
    }else{
        return false
    }
  }
  isNotANumber(value: any): boolean {
    return isNaN(value);
  }
  ifExtension(value: any): boolean {
    if(isNaN(value) && value!=0){
        return false
    }else{
      return true
    }
  }
 async onComponentRendered() {
  const urlParams = new URLSearchParams(window.location.search);
    this.oauth = parseInt(urlParams.get('user_id')!);
    if(Number.isNaN(this.oauth)){
     
       
      this.oauth = parseInt(window.sessionStorage.getItem("git_user")!)
   
    }else{
      window.sessionStorage.setItem("git_user",urlParams.get('user_id')!.toString())
    }

    let podaci = await fetch(environment.rest+'/baza/korisnikPodaci')
    let tip = JSON.parse(await podaci.text())
    this.tip_korisnika = tip.tip_korisnika_id
    if(this.tip_korisnika != undefined){
       window.sessionStorage.setItem("tip",this.tip_korisnika.toString())
    }
    
  
  }
  
  async logOut(){
    console.log("Hello")
     fetch(environment.rest+'/odjava').then(res=>{
       if(res.status == 200){
        window.sessionStorage.clear()
        
        console.log("Odjava")
        this.router.navigate(['/'])
        window.location.reload()
       }
     }).catch((err)=>{
      console.log(err)
     })
  }

    
}
