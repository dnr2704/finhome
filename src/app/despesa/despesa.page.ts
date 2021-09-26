import { NgxMaskModule } from 'ngx-mask';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-var */
/* eslint-disable max-len */
import { Usuario } from './../models/usuario';
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
import { ToastService } from './../servicos/toast.service';
import { ValidacaoService } from './../servicos/validacao.service';
import { UtilService } from './../servicos/util.service';
import { environment } from 'src/environments/environment';
import { Despesa } from './../models/despesa';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { StorageService } from '../servicos/storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskPipe } from 'ngx-mask';

import * as $ from 'jquery';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.page.html',
  styleUrls: ['./despesa.page.scss'],
})
export class DespesaPage implements OnInit {


  id: any;
  formulario: FormGroup;

  constructor(
    private rota: Router,
    private http: HttpClient,
    private validacao: ValidacaoService,
    private toast: ToastService,
    private store: StorageService,
    private fb: FormBuilder,
    private util: UtilService) {

  }

  ngOnInit() {
    this.formulario = this.fb.group({
      codigo: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]]
    });

    this.id = this.rota.url.replace('/despesa/', '');
    this.util.limpaInput();
    this.http.get<Despesa[]>(environment.api + '/' + 'ListaDespesa/id/' + this.id).subscribe(dados => {
      this.util.setValorInput('codigo', dados[0].codigo);
      this.util.setValorInput('descricao', dados[0].descricao);
      this.util.setValorInput('valor', dados[0].valor);
      this.util.setValorInput('datainicio', this.util.ajustaData(dados[0].datainicio, 'yyyy-mm-dd'));
      this.util.setValorInput('datafim', this.util.ajustaData(dados[0].datafim, 'yyyy-mm-dd'));
    });
  }

  onChange($event){
    console.log($event.target.value);
    }

  onSubmit(form) {
    console.log(form);
  };

  salvar() {
    let validou = false;
    if (this.validacao.verificaObrigatorio() === true) {
      if (this.id == null) // inserção
      {
        let dataFim = (document.getElementById('datafim') as HTMLInputElement).value;
        if (dataFim != '') {
          let dataAtual = new Date().toISOString().slice(0, 10);
          if (dataFim < dataAtual) {
            validou = false;
            this.toast.showToast('A data de término deve ser superior ou igual à data atual.', 3000);
          }
          else {
            this.id = 0;
            validou = true;
          }
        }
      }
      else {
        validou = true;
      }
      if (validou) {
        let dataTermino = (document.getElementById('datafim') as HTMLInputElement).value;
        dataTermino = dataTermino == '' ? '1899-01-01' : this.util.ajustaData((document.getElementById('datafim') as HTMLInputElement).value, 'yyyy-mm-dd');
        let email = this.store.get('email');
        this.http.get<Usuario[]>(environment.api + '/' + 'ExisteUsuario/' + email + '/0').subscribe(dados => {
          let jsonDados = JSON.parse(JSON.stringify({
            id: this.id,
            codigo: (document.getElementById('codigo') as HTMLInputElement).value,
            descricao: (document.getElementById('descricao') as HTMLInputElement).value,
            datainicio: this.util.ajustaData((document.getElementById('datainicio') as HTMLInputElement).value, 'yyyy-mm-dd'),
            datafim: dataTermino,
            valor: (document.getElementById('valor') as HTMLInputElement).value,
            idusu: dados[0].id
          }));
          this.http.post<Despesa[]>(environment.api + '/' + 'SalvaDespesa/', jsonDados).subscribe();
          this.toast.showToast(this.id == 0 ? 'Dados cadastrados com sucesso.' : 'Dados atualizados com sucesso.', 3000);
          this.rota.navigateByUrl('/despesas');
          (document.getElementById('searchbar') as HTMLInputElement).value = 'x';
          (document.getElementById('searchbar') as HTMLInputElement).value = '';
        });
      }
    }
  }
}
