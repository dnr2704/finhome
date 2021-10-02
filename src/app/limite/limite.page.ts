/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Categoria } from './../models/categoria';
import { Limite } from './../models/limite';
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-shorthand */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Conta } from '../models/conta';
import { StorageService } from '../servicos/storage.service';
import { ToastService } from '../servicos/toast.service';
import { UtilService } from '../servicos/util.service';
import { ValidacaoService } from '../servicos/validacao.service';
import { NgxMaskModule } from 'ngx-mask';
import { MaskPipe } from 'ngx-mask';
import * as $ from 'jquery';
import { Usuario } from '../models/usuario';
import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';

@Component({
  selector: 'app-limite',
  templateUrl: './limite.page.html',
  styleUrls: ['./limite.page.scss'],
})
export class LimitePage implements OnInit {

  id: any;
  idcat: any;
  categorias = [];

  constructor(
    private rota: Router,
    private http: HttpClient,
    private validacao: ValidacaoService,
    private toast: ToastService,
    private store: StorageService,
    private util: UtilService) {

  }

  ngOnInit() {
    this.id = this.rota.url.replace('/limite/', '');
    this.util.limpaInput();
    this.http.get(environment.api + '/' + 'ListaCategoria/tipo/D/0')
      .subscribe(data => {
        this.categorias = JSON.parse(JSON.stringify(data));
        this.http.get<[Limite]>(environment.api + '/' + 'ListaLimite/idusu/' + this.store.get('idusu') + '/' + '0').subscribe(dados => {
          if (this.id != 0) {
            this.util.setValorInput('codigo', dados[0].codigo);
            this.util.setValorInput('descricao', dados[0].descricao);
            this.util.setValorInput('valor', 'R$ ' + dados[0].valor);
            let idcat = dados[0].idcat;
            for (var i = 0; i < this.categorias.length; i++) {
              let selected = this.categorias[i].id == idcat ? 'selected' : '';
              $('#slcategoria').append('<option ' + selected + ' id="' + this.categorias[i].id + '" value=' + this.categorias[i].id + '>' + this.categorias[i].descricao + '</option>');
            }
          }
          else {
            for (var i = 0; i < this.categorias.length; i++) {
              $('#slcategoria').append('<option id="' + this.categorias[i].id + '" value=' + this.categorias[i].id + '>' + this.categorias[i].descricao + '</option>');
            }
          }
        });
      });
  }

  salvar() {
    if (this.validacao.verificaObrigatorio() === true) {
      let valor = (document.getElementById('valor') as HTMLInputElement).value.replace('R$', '').trim();
      let idcat = (document.getElementById('slcategoria') as HTMLInputElement).value;
      valor = this.util.ajustaValor(false, valor);
      let jsonDados = JSON.parse(JSON.stringify({
        id: this.id,
        codigo: (document.getElementById('codigo') as HTMLInputElement).value,
        descricao: (document.getElementById('descricao') as HTMLInputElement).value,
        valor: valor,
        idcat: idcat,
        idusu: this.store.get('idusu')
      }));
      this.http.post<Limite[]>(environment.api + '/' + 'SalvaLimite/', jsonDados).subscribe();
      this.toast.showToast(this.id == 0 ? 'Dados cadastrados com sucesso.' : 'Dados atualizados com sucesso.', 3000);
      this.rota.navigateByUrl('/limites');
      $('#sblimite').val('x');
      $('#sblimite').val('');
    }
  }
}
