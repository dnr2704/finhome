import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],

})
export class Tab2Page {

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
