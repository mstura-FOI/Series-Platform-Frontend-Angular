import { Component, OnInit } from '@angular/core';
import { environment } from '../enviroments/environment.prod';

@Component({
  selector: 'app-dnevnik',
  templateUrl: './dnevnik.component.html',
  styleUrl: './dnevnik.component.scss'
})
export class DnevnikComponent implements OnInit {
  tip_korisnika: number | undefined
  dnevnik: any[] | undefined;
  poredak = 1
  stranica = 1
  brojPod = 10
  ngOnInit(): void {
    this.onComponentRendered()
    this.Load_Dnevnik()
  }
  onComponentRendered() {
    this.tip_korisnika = parseInt(window.sessionStorage.getItem("tip")!)
    console.log(this.tip_korisnika)
  }
  async Load_Dnevnik(){
    let dnevnik = await fetch(environment.rest+"/baza/dnevnik?stranica="+1+"&brojpod="+this.brojPod+"&poredak="+this.poredak)
    let dnevnici = await JSON.parse(await dnevnik.text())
    this.dnevnik = dnevnici 
   
  }
  async Next(){
    if(this.stranica<100){
      this.stranica++
  }
  let dnevnik = await fetch(environment.rest+"/baza/dnevnik?stranica="+this.stranica+"&brojpod="+this.brojPod+"&poredak="+this.poredak)
  let dnevnici = await JSON.parse(await dnevnik.text())
  this.dnevnik = dnevnici
  }
  async Previous(){
    if(this.stranica>1){
      this.stranica--
  }
  let dnevnik = await fetch(environment.rest+"/baza/dnevnik?stranica="+this.stranica+"&brojpod="+this.brojPod)
  let dnevnici = await JSON.parse(await dnevnik.text())
  this.dnevnik = dnevnici
  }
  async Date_Sort(){
    if(this.poredak==1){
      this.poredak = 2
  }else if(this.poredak==2){
    this.poredak = 1
  }
  let dnevnik = await fetch(environment.rest+"/baza/dnevnik?stranica="+this.stranica+"&brojpod="+this.brojPod+"&poredak="+this.poredak)
  let dnevnici = await JSON.parse(await dnevnik.text())
  this.dnevnik = dnevnici

  }
}
