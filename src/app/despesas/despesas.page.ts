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


@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {

  isItemDisponivel = false;
  carregou = false;
  itens = [];
  itensId = [];

  constructor(private http: HttpClient) { }


  carregarItems() {
    this.http.get(environment.api + '/' + 'ListaDespesa/')
      .subscribe(data => {
        this.itens = JSON.parse(JSON.stringify(data));
      });

  }

  ngOnInit() {
    this.carregou = true;
    this.carregarItems();
  }

  busca(ev: any) {
    this.itens = [];
    this.itensId = [];
    this.carregou = false;
    this.http.get(environment.api + '/' + 'ListaDespesa/')
      .subscribe(data => {
        const val = ev.target.value;
        if (val && val.trim() !== '') {
          this.isItemDisponivel = true;
          const json = JSON.stringify(data);
          var x = json.split('}');
          var descricoes = '';
          var ids = '';
          for (var i = 0; i < x.length; i++) {
            var sliceDescricao = x[i].slice(0, x[i].indexOf('descricao') + 12);
            var tempDescricao = x[i].replace(sliceDescricao, '');
            var descricao = tempDescricao.substr(0, tempDescricao.indexOf('"'));
            if (descricao.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
              // descricoes += '\'' + descricao + '\'' + ',';
              descricoes += descricao + ',';
              var id = x[i].slice(7, x[i].indexOf('id') + 5);
              ids += id + ',';
            }
          }
          if (descricoes.length > 0) {
            descricoes = descricoes.substring(0, descricoes.length - 1);
            this.itens = descricoes.split(',');
            this.itensId = ids.split(',');

            alert(this.itensId);
          }
        } else {
          this.carregou = true;
          this.carregarItems();
        }
      });
  }
}
