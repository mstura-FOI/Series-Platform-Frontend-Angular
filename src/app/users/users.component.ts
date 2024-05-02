import { Component, OnInit } from '@angular/core';
import { environment } from '../enviroments/environment.prod';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  rest = environment.restServis
  tip_korisnika: number | undefined
  korisnici : any[] | undefined
  ngOnInit(): void {
    this.onComponentRendered()
    this.loadUser()
  }
  onComponentRendered() {
    
 
    this.tip_korisnika = parseInt(window.sessionStorage.getItem("tip")!)
    console.log(this.tip_korisnika)
  }
  async deleteUser(korime:string,id:number){
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let tijelo = {
        korID: id
    };
    let parametri = {
        method: "DELETE",
        body: JSON.stringify(tijelo),
        headers: zaglavlje,
    };
    let brisi = await fetch(this.rest+"korisnici/" + korime, parametri);
    window.location.reload()
  }
  async loadUser(){
    let podaci = await fetch(this.rest+"korisnici")
    this.korisnici = await JSON.parse(await podaci.text())
  }
}
