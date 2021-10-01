/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
import { Categoria } from './../../models/categoria';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilService } from './../../servicos/util.service';
import { ToastService } from './../../servicos/toast.service';
import { ValidacaoService } from './../../servicos/validacao.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/servicos/storage.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  id: any;
  tipoCategoria: any;

  constructor(
    private validacao: ValidacaoService,
    private toast: ToastService,
    private util: UtilService,
    private http: HttpClient,
    private store: StorageService,
    private rota: Router
  ) { }

  ngOnInit() {
    let params = [];
    params = this.rota.url.replace('/categoria/', '').split('/');
    this.id = params[0];
    this.tipoCategoria = params[1];
    let titulo = this.tipoCategoria === 'R' ? 'Receita' : 'Despesa';
    (document.getElementById('sprecdep') as HTMLSpanElement).innerText = titulo;
    this.util.limpaInput();
    this.http.get<Categoria[]>(environment.api + '/' + 'ListaCategoria/id/RD/' + this.id).subscribe(dados => {
      this.util.setValorInput('codigo', dados[0].codigo);
      this.util.setValorInput('descricao', dados[0].descricao);
    });
  }
  salvar() {
    let codigo = (document.getElementById('codigo') as HTMLInputElement).value;
    let descricao = (document.getElementById('descricao') as HTMLInputElement).value;
    if (this.validacao.verificaObrigatorio() === true) {
      let jsonDados = JSON.parse(JSON.stringify({
        id: this.id,
        codigo: codigo,
        descricao: descricao,
        tipo: this.tipoCategoria,
        idloc: 1
      }));
      this.http.post<Categoria[]>(environment.api + '/' + 'SalvaCategoria/', jsonDados).subscribe();
      this.toast.showToast(this.id == 0 ? 'Dados cadastrados com sucesso.' : 'Dados atualizados com sucesso.', 3000);
      //this.rota.navigateByUrl('/categoria');
      window.history.back();
      if (this.tipoCategoria == 'R') {
        (document.getElementById('sbar-catreceita') as HTMLInputElement).value = 'x';
        (document.getElementById('sbar-catreceita') as HTMLInputElement).value = '';
      }
      else {
        (document.getElementById('sbar-catdespesa') as HTMLInputElement).value = 'x';
        (document.getElementById('sbar-catdespesa') as HTMLInputElement).value = '';
      }
    }
  }
}
