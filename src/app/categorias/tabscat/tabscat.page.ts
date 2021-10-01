/* eslint-disable eqeqeq */
import { HttpClient } from '@angular/common/http';
import { TabreceitaPage } from '../tabreceita/tabreceita.page';
import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/servicos/alerta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tabscat',
  templateUrl: './tabscat.page.html',
  styleUrls: ['./tabscat.page.scss'],
})
export class TabscatPage implements OnInit {

  tipoCategoria: any;
  constructor() { }

  ngOnInit() {
    (document.getElementById('tipoCategoria') as HTMLInputElement).value = 'R';
  }
}
