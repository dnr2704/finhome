import { Cartao } from './../models/cartao';
/* eslint-disable eol-last */
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
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoPage implements OnInit {

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
    this.id = this.rota.url.replace('/cartao/', '');
    this.util.limpaInput();
    this.http.get<[Cartao]>(environment.api + '/' + 'ListaCartao/idusu/' + this.store.get('idusu') + '/' + '0').subscribe(dados => {
      if (this.id != 0) {
        this.util.setValorInput('codigo', dados[0].codigo);
        this.util.setValorInput('descricao', dados[0].descricao);
        this.util.setValorInput('limite', 'R$ ' + dados[0].limite);
        this.util.setValorInput('vencedia', dados[0].vencedia);
        this.util.setValorInput('fechadia', dados[0].fechadia);
      }
    });
  }

  salvar() {
    if (this.validacao.verificaObrigatorio() === true) {
      let limite = (document.getElementById('limite') as HTMLInputElement).value.replace('R$', '').trim();
      limite = this.util.ajustaValor(false, limite);
      let vencedia = (document.getElementById('vencedia') as HTMLInputElement).value;
      // let fechadia = (document.getElementById('fechadia') as HTMLInputElement).value;
      let fechadia = '0';
      if (parseInt(vencedia, 10) > 31) {
        this.toast.showToast('O dia de vencimento informado é inválido.', 2000);
      }
      else {
        if (parseInt(fechadia, 10) > 31) {
          this.toast.showToast('O dia de fechamento informado é inválido.', 2000);
        } else {
          let jsonDados = JSON.parse(JSON.stringify({
            id: this.id,
            codigo: (document.getElementById('codigo') as HTMLInputElement).value,
            descricao: (document.getElementById('descricao') as HTMLInputElement).value,
            limite: limite,
            vencedia: vencedia,
            fechadia: fechadia,
            idusu: this.store.get('idusu')
          }));
          this.http.post<Cartao[]>(environment.api + '/' + 'SalvaCartao/', jsonDados).subscribe();
          this.toast.showToast(this.id == 0 ? 'Dados cadastrados com sucesso.' : 'Dados atualizados com sucesso.', 3000);
          this.rota.navigateByUrl('/cartoes');
          $('#sbcartao').val('x');
          $('#sbcartao').val('');
        }
      }
    }
  }
}
