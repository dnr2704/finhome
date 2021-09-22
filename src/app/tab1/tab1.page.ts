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

  carregarItems(){
    this.itens = ['Meu Perfil','Receitas e Despesas', 'Cartões de Crédito', 'Minhas Contas','Limites de Gastos', 'Despesas Fixas'];
    this.icones = ['person','bag', 'card','wallet-outline','warning','cash'];
    this.links = ['perfil','categorias', 'cartoes','contas','limites','despesas'];
  }

  ngOnInit() {
    this.carregarItems();
  }

  buscaMenu(ev: any) {
    this.carregarItems();
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
