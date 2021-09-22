import { environment } from 'src/environments/environment';
import { Despesa } from './../models/despesa';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {

  isItemDisponivel = false;
  itens = [];

  constructor(private http: HttpClient) { }

  initializeItems() {
    this.http.get<Despesa[]>(environment.api + '/' + 'ListaDespesa/').subscribe(
      dados => this.itens = dados);
  }

  ngOnInit() {
    this.initializeItems();

  }

  busca(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      // this.isItemAvailable = true;
      this.itens = this.itens.filter((item) => (item.toLowerCase().indexOf(val.toLowerCase()) > -1));
    } else {
      this.isItemDisponivel = false;
    }
  }
}
