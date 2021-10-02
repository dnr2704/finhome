/* eslint-disable eol-last */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertaService } from '../servicos/alerta.service';
import { StorageService } from '../servicos/storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-limites',
  templateUrl: './limites.page.html',
  styleUrls: ['./limites.page.scss'],
})
export class LimitesPage implements OnInit {

  itens = [];

  constructor(
    private http: HttpClient,
    private alerta: AlertaService,
    private storage: StorageService
  ) { }

  carregarItems(tipo, idusu, parametro) {
    this.http.get(environment.api + '/' + 'ListaLimite/' + tipo + '/' + idusu + '/' + parametro)
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

  excluiLimite(id) {
    this.alerta.confirmacao('Confirmação', 'Confirma a exclusão desse limte de gastos ?', 'Cancelar', 'OK').then((res) => {
      if (res === 'ok') {
        this.http.get(environment.api + '/' + 'ExcluiLimite/' + id).subscribe(dados => {
          this.carregarItems('idusu', this.storage.get('idusu'), '0');
        });
        $('#sblimite').val('x');
        $('#sblimite').val('');
      }
    });
  }
}
