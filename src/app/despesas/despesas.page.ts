/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable no-trailing-spaces */
import { environment } from 'src/environments/environment';
import { Despesa } from './../models/despesa';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AlertaService } from '../servicos/alerta.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {

  itens = [];

  constructor(
    private http: HttpClient,
    private alerta: AlertaService
  ) { }

  carregarItems(tipo, parametro) {
    this.http.get(environment.api + '/' + 'ListaDespesa/' + tipo + '/' + parametro)
      .subscribe(data => {
        this.itens = JSON.parse(JSON.stringify(data));
      });
  }

  ngOnInit() {
    this.carregarItems('a', '0');
  }

  busca(ev: any) {
    const parametro = ev.target.value;
    if (parametro && parametro.trim() !== '') {
      this.carregarItems('descricao', parametro);
    }
    else {
      this.carregarItems('a', '0');
    }
  }

  excluiDespesa(id) {
    this.alerta.confirmacao('Confirmação', 'Confirma a exclusão dessa despesa?', 'Cancelar', 'OK').then((res) => {
      if (res === 'ok') {
        this.http.get(environment.api + '/' + 'ExcluiDespesa/' + id).subscribe(dados => {
          this.carregarItems('a', '0');
        });
        (document.getElementById('searchbar') as HTMLInputElement).value = 'x';
        (document.getElementById('searchbar') as HTMLInputElement).value = '';
      }
    });
  }
}
