import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  ano = new Date().getFullYear();

  slideOpts: any = {
    initialSlide: 0,
    speed: 400
  };

  constructor() {}

  alerta(){
    alert('');
  }

}
