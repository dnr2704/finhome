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


@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {

  id: any;
  tipo;

  constructor(
    private rota: Router,
    private http: HttpClient,
    private validacao: ValidacaoService,
    private toast: ToastService,
    private store: StorageService,
    private util: UtilService) {

  }

  ngOnInit() {

    this.id = this.rota.url.replace('/conta/', '');
    this.util.limpaInput();
    this.http.get<Conta[]>(environment.api + '/' + 'ListaConta/id/' + this.id).subscribe(dados => {
      this.util.setValorInput('codigo', dados[0].codigo);
      this.util.setValorInput('nome', dados[0].nome);
      this.util.setValorInput('instituicao', dados[0].instituicao);
      let posicao = dados[0].tipo === 'C' ? '0' : '1';
      $('#sltipoconta').val($('#sltipoconta option:eq(' + posicao + ')').val());
      this.util.setValorInput('observacoes', dados[0].observacoes);
      this.util.setValorInput('saldo', 'R$ ' + dados[0].saldo);
    });
  }

  salvar() {
    if (this.validacao.verificaObrigatorio() === true) {
      let email = this.store.get('email');
      let saldo = (document.getElementById('saldo') as HTMLInputElement).value.replace('R$', '').trim();
      saldo = this.util.ajustaValor(false,saldo);
      this.http.get<Usuario[]>(environment.api + '/' + 'ExisteUsuario/' + email + '/0').subscribe(dados => {
        let jsonDados = JSON.parse(JSON.stringify({
          id: this.id,
          codigo: (document.getElementById('codigo') as HTMLInputElement).value,
          nome: (document.getElementById('nome') as HTMLInputElement).value,
          instituicao: (document.getElementById('instituicao') as HTMLInputElement).value,
          saldo: saldo,
          tipo: (document.getElementById('sltipoconta') as HTMLInputElement).value,
          observacoes: (document.getElementById('observacoes') as HTMLInputElement).value,
          idusu: dados[0].id
        }));
        this.http.post<Conta[]>(environment.api + '/' + 'SalvaConta/', jsonDados).subscribe();
        this.toast.showToast(this.id == 0 ? 'Dados cadastrados com sucesso.' : 'Dados atualizados com sucesso.', 3000);
        this.rota.navigateByUrl('/contas');
        (document.getElementById('searchbar-conta') as HTMLInputElement).value = 'x';
        (document.getElementById('searchbar-conta') as HTMLInputElement).value = '';
      });
    }
  }
}
