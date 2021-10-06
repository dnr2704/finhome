import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertaService } from '../servicos/alerta.service';
import { StorageService } from '../servicos/storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html',
  styleUrls: ['./contas.page.scss'],
})
export class ContasPage implements OnInit {

  itens = [];

  constructor(
    private http: HttpClient,
    private alerta: AlertaService,
    private storage: StorageService
  ) { }

  carregarItems(tipo, idusu, parametro) {
    this.http.get(environment.api + '/' + 'ListaConta/' + tipo + '/' + idusu + '/' + parametro)
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
      this.carregarItems('instituicao', this.storage.get('idusu'), parametro);
    }
    else {
      this.carregarItems('idusu', this.storage.get('idusu'), '0');
    }
  }

  excluiConta(id) {
    this.alerta.confirmacao('Confirmação', 'Confirma a exclusão dessa conta?', 'Cancelar', 'OK').then((res) => {
      if (res === 'ok') {
        this.http.get(environment.api + '/' + 'ExcluiConta/' + id).subscribe(dados => {
          this.carregarItems('idusu', this.storage.get('idusu'), '0');
        });
        $('#sbconta').val('x');
        $('#sbconta').val('');
      }
    });
  }
}
