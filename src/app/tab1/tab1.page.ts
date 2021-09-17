import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page {

  saudacao: string;

   slideOpts: any = {
    initialSlide: 0,
    speed: 400
   };

  constructor() {}


  ngOnInit() {
    let hora = new Date().getHours();
    this.saudacao = ((hora >= 1) && (hora <= 12)) ? 'Bom dia' : ((hora >= 13) && (hora <= 18)) ? 'Boa tarde' : 'Boa noite';
  }





}
