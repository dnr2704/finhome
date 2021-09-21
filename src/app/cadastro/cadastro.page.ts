import { Usuario } from './../models/usuario';
import { StorageService } from './../servicos/storage.service';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from './../servicos/toast.service';
import { ValidacaoService } from './../servicos/validacao.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(
    private validacao: ValidacaoService,
    private toast: ToastService,
    private storage: StorageService,
    private http: HttpClient,
    private rota: Router) { }

  ngOnInit() {
  }

  handleError(e: any) {
    console.log(e);
  }

  validaCadastro() {
    if (this.validacao.verificaObrigatorio() === true) {
      let confirmacao = (document.getElementById('confirmacao') as HTMLInputElement).value;
      let senha = (document.getElementById('senha') as HTMLInputElement).value;

      // eslint-disable-next-line eqeqeq
      if (confirmacao != senha) {
        this.toast.showToast('A confirmação é diferente da senha informada.', 2000);
      }
      else {
        let email = (document.getElementById('email') as HTMLInputElement).value.toLowerCase().trim();
        this.validacao.existeUsuario(email).subscribe(dados => {
          // eslint-disable-next-line eqeqeq
          if (dados.length == 0) {
            let jsonNovoUsuario = JSON.parse(JSON.stringify({
              admin: 'N',
              imagem: '',
              datanascimento: '',
              email: (document.getElementById('email') as HTMLInputElement).value.toLowerCase().trim(),
              senha: (document.getElementById('senha') as HTMLInputElement).value,
              nome: (document.getElementById('nome') as HTMLInputElement).value,
              sobrenome: (document.getElementById('sobrenome') as HTMLInputElement).value
            }));
            try {
              this.storage.set('email', email);
              this.rota.navigateByUrl('/tabs/tab2');
            }
            catch (error) {
              this.toast.showToast('Não foi possível realizar seu cadastro. Tente mais tarde.', 3000);
            }
          }
          else {
            this.toast.showToast('Já existe um cadastro para o e-mail ' + '"' + email.toLowerCase() + '"' + '.', 3000);
          }
        });
      }
    }
  }
}
