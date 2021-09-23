/* eslint-disable curly */
/* eslint-disable no-var */
/* eslint-disable max-len */
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
    if (this.validacao.verificaObrigatorio() === true)
    {
      var senha1 = (document.getElementById('senha1') as HTMLInputElement).value;
      var senha2 = (document.getElementById('senha2') as HTMLInputElement).value;
      // eslint-disable-next-line eqeqeq
      if (senha1 != senha2)
      {
        this.toast.showToast('A senha de confirmação é diferente da senha informada.', 2000);
      }
      else
      {
        let email = (document.getElementById('email') as HTMLInputElement).value;
        this.validacao.existeUsuario(email).subscribe(dados => {
          // eslint-disable-next-line eqeqeq
          if (dados.length == 0) {
            this.storage.clear();
            this.storage.set('email', email);
            let jsonNovoUsuario = JSON.parse(JSON.stringify({
              admin: 'N',
              imagem: '',
              datanascimento: '',
              email: (document.getElementById('email') as HTMLInputElement).value.toLowerCase().trim(),
              senha: (document.getElementById('senha1') as HTMLInputElement).value,
              nome: (document.getElementById('nome') as HTMLInputElement).value,
              sobrenome: (document.getElementById('sobrenome') as HTMLInputElement).value
            }));
            this.http.post<Usuario[]>(environment.api + '/' + 'InsereUsuario/', jsonNovoUsuario).subscribe();
            // verificar se o cadastro foi realizado

            this.rota.navigateByUrl('/tabs/tab2');
            this.storage.set('email', email);
            // this.http.post<Usuario[]>(environment.api + '/' + 'InsereUsuario/', jsonNovoUsuario).subscribe(
            //   (response) => {
            //     alert(response[0].id);
            //   },
            //   (error) => {//error() callback
            //     //alert('Request failed with error');
            //     this.storage.set('email', email);
            //     this.rota.navigateByUrl('/tabs/tab2');
            //   },
            //   () => { //complete() callback
            //   });


          }
          else {
            this.toast.showToast('Já existe um cadastro para o e-mail ' + '"' + (document.getElementById('email') as HTMLInputElement).value + '"' + '.', 3000);
          }
        });
      }
    }
  }
}
