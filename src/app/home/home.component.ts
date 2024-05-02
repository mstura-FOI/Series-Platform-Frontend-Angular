import { Component, Input, OnInit } from '@angular/core';
import { SerijaTmdbI, SerijeTmdbI } from '../servis/SerijeTMDBI';
import { environment } from '../enviroments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private router:Router){}
  filter: String = '';
  serije: Array<SerijaTmdbI> = new Array<SerijaTmdbI>;
  rest = environment.restServis
  oauth: number = 0
  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.oauth = parseInt(urlParams.get('user_id')!);
    if(Number.isNaN(this.oauth)){
      
       
      this.oauth = parseInt(window.sessionStorage.getItem("git_user")!)
     
    }else{
      window.sessionStorage.setItem("git_user",urlParams.get('user_id')!.toString())
    }
   
    
      
    

  }
  ifExtension(value: any): boolean {
    if(isNaN(value) && value!=0){
        return false
    }else{
      return true
    }
  }

  async pretrazi(){
    if(this.filter.length>=3){
       var podaci = await fetch(`${this.rest}tmdb/serije?stranica=1&trazi=${this.filter}`)
     var series = JSON.parse(await podaci.text())
     
     this.serije = series.results;
    }
    
  }

  detalji(id: number){
    
    this.router.navigate(['/movieDetails',id])
  }
  

}
