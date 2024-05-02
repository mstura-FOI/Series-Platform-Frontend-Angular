import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerijaTmdbI, Sezona, gitSerija } from '../servis/SerijeTMDBI';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  serija : SerijaTmdbI | undefined;
  tip_korisnika: number = 0;
  user_id: number = 0;
  sezona: Array<Sezona> = new Array<Sezona>
  oauth: number = 0
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      const id = +params['id'];
      this.onComponentRendered()
      this.fetchMovieDetails(id);
      this.seasonLoader(id)
    })
  }
  async fetchMovieDetails(id:number){
     
      let podaci = await fetch(`http://localhost:12479/serijaDetaljiID?id=${id}`)
      this.serija = JSON.parse(await podaci.text())
      
  }
  githubUserAddsSeries(){
    let seriesbefore: Array<gitSerija> = JSON.parse(window.localStorage.getItem("git_user_favourites")!)
  
    let fail: boolean = false
    if(seriesbefore != null){
      let seria = {
      korID: this.user_id,
      serijaID: this.serija?.id,
      naziv: this.serija?.original_name,
      opis:  this.serija?.overview,
      broj_sezona: this.serija?.number_of_seasons,
      broj_epizoda:this.serija?.number_of_episodes,
      popularnost:this.serija?.popularity,
      poster_putanja:this.serija?.poster_path,
      poveznica: this.serija?.homepage,
      sezone: this.serija?.seasons
    }
    seriesbefore.map(serie=>{
      if(serie.serijaID == this.serija?.id){
        fail = true
      }
    })
    if(fail == false){
      let series = [...seriesbefore,seria];
    window.localStorage.setItem("git_user_favourites",JSON.stringify(series))
    }else{
      console.log("fail")
    }
    
    
    }else{
      let series = [{
        korID: this.user_id,
        serijaID: this.serija?.id,
        naziv: this.serija?.original_name,
        opis:  this.serija?.overview,
        broj_sezona: this.serija?.number_of_seasons,
        broj_epizoda:this.serija?.number_of_episodes,
        popularnost:this.serija?.popularity,
        poster_putanja:this.serija?.poster_path,
        poveznica: this.serija?.homepage,
        sezone: this.serija?.seasons
      }];
      
      window.localStorage.setItem("git_user_favourites",JSON.stringify(series))
      
    }
    window.location.reload()
    
  }

  async onComponentRendered() {
    const urlParams = new URLSearchParams(window.location.search);
    this.oauth = parseInt(urlParams.get('user_id')!);
    if(Number.isNaN(this.oauth)){
    
       
      this.oauth = parseInt(window.sessionStorage.getItem("git_user"!)!)
      
    }else{
      window.sessionStorage.setItem("git_user",urlParams.get('user_id')!.toString())
    }


    let podaci = await fetch('http://localhost:12479/baza/korisnikPodaci')
  

    let tip = JSON.parse(await podaci.text())
    this.tip_korisnika = tip.tip_korisnika_id
    this.user_id = tip.id
    console.log(this.tip_korisnika)
    console.log(this.user_id)
  }
  async seasonLoader(series_id:number){
    let sezone = await fetch("/dajSezone?serijaID="+series_id)
    let sezonePodaci = await JSON.parse(await sezone.text())
   
    this.sezona = sezonePodaci
  }
  async onAddToFavourites(){
    
    let tijelo = {
      korID: this.user_id,
      serijaID: this.serija?.id,
      naziv: this.serija?.original_name,
      opis:  this.serija?.overview,
      broj_sezona: this.serija?.number_of_seasons,
      broj_epizoda:this.serija?.number_of_episodes,
      popularnost:this.serija?.popularity,
      poster_putanja:this.serija?.poster_path,
      poveznica: this.serija?.homepage,
      sezone: this.serija?.seasons
    };
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
  
    let parametri = {
      method: "POST",
      body: JSON.stringify(tijelo),
      headers: zaglavlje,
    };
      let podaci = await fetch("http://localhost:12479/dodajSeriju",parametri)
      console.log(podaci)
      if(podaci.status == 200){
        window.location.reload()
      }
  }
  ifExtension(value: any): boolean {
    if(isNaN(value) && value!=0){
        return false
    }else{
      return true
    }
  }
}
