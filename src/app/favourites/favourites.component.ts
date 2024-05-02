import { Component, OnInit } from '@angular/core';
import { Serija, SerijaTmdbI, gitSerija } from '../servis/SerijeTMDBI';
import { Router } from '@angular/router';
import { environment } from '../enviroments/environment.prod';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit {
  constructor( private route: Router){}
  serije: Array<Serija> = new Array<Serija>
  gitSerije: Array<gitSerija> = new Array<gitSerija>
  oauth: number = 0
 async ngOnInit(): Promise<void> {
    
    let id = await this.onComponentRendered()
    
    if(this.ifExtension(this.oauth)){
      this.gitSerije = JSON.parse(window.localStorage.getItem("git_user_favourites")!)
    }else{
      this.loadFavorites(id)
    }

  }
  ifExtension(value: any): boolean {
    if(isNaN(value) && value!=0){
        return false
    }else{
      return true
    }
  }
  tip_korisnika:number = 0
  user_id:number = 0

  async onComponentRendered() : Promise<number> {
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
    this.user_id = tip.id
    return this.user_id
  }
  details(id:number){
    this.route.navigate(['/movieDetails',id])
  }
  gitDelete(id:number){
   let series: Array<gitSerija> = JSON.parse(window.localStorage.getItem("git_user_favourites")!)
   let serije = series.filter(serie=> serie.serijaID !== id)
   console.log(serije)
   window.localStorage.setItem("git_user_favourites",JSON.stringify(serije))
   console.log("Success")
   window.location.reload()
  }

 async delete(id:number,korID:number){
  let zaglavlje = new Headers();
  zaglavlje.set("Content-Type", "application/json");
  let tijelo = {
      korID: korID
  };
  let parametri = {
      method: "DELETE",
      body: JSON.stringify(tijelo),
      headers: zaglavlje,
  };

  let brisi = await fetch(environment.rest+"/baza/favoriti/" + id, parametri);
  window.location.reload();
  }
  async loadFavorites(id:number){
    let favoriti = await fetch(environment.rest+"/baza/favoriti/"+id)
    let favpodaci = await JSON.parse(await favoriti.text())
    this.serije = favpodaci
  }
}
