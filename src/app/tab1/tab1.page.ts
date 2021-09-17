import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page {

  isItemDisponivel = false;
  itens = [];
  icones = [];
  links = [];


  constructor() {}

  initializeItems(){
    this.itens = ['Meu Perfil','Receitas e Despesas', 'Cartões de Crédito', 'Minhas Contas','Limites de Gastos', 'Despesas Fixas'];
    this.icones = ['person','bag', 'card','wallet-outline','warning','cash'];
    this.links = ['perfil','categorias', 'cartoes','contas','limites','despesas'];
  }

  ngOnInit() {
    this.initializeItems();
  }

  buscaMenu(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '')
    {
        // this.isItemAvailable = true;
        this.itens = this.itens.filter((item) => (item.toLowerCase().indexOf(val.toLowerCase()) > -1));
          } else {
        this.isItemDisponivel = false;
    }
  }

}
