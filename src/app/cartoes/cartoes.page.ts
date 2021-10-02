/* eslint-disable eol-last */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertaService } from '../servicos/alerta.service';
import { StorageService } from '../servicos/storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.page.html',
  styleUrls: ['./cartoes.page.scss'],
})
export class CartoesPage implements OnInit {

  itens = [];

  constructor(
    private http: HttpClient,
    private alerta: AlertaService,
    private storage: StorageService
  ) { }

  carregarItems(tipo, idusu, parametro) {
    this.http.get(environment.api + '/' + 'ListaCartao/' + tipo + '/' + idusu + '/' + parametro)
      .subscribe(data => {
        this.itens = JSON.parse(JSON.stringify(data));
      });
  }

  ngOnInit() {
    this.carregarItems('idusu', this.storage.get('idusu'), '0');
  }

  busca(ev: any) {
    const parametro = ev.target.value;
    if (parametro && parametro.trim() !== '') {
      this.carregarItems('descricao', this.storage.get('idusu'), parametro);
    }
    else {
      this.carregarItems('idusu', this.storage.get('idusu'), '0');
    }
  }

  excluiCartao(id) {
    this.alerta.confirmacao('Confirmação', 'Confirma a exclusão desse cartão ?', 'Cancelar', 'OK').then((res) => {
      if (res === 'ok') {
        this.http.get(environment.api + '/' + 'ExcluiCartao/' + id).subscribe(dados => {
          this.carregarItems('idusu', this.storage.get('idusu'), '0');
        });
        $('#sbcartao').val('x');
        $('#sbcartao').val('');
      }
    });
  }
}
