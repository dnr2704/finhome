/* eslint-disable eqeqeq */
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './../servicos/util.service';
import { ValidacaoService } from './../servicos/validacao.service';
import { ToastService } from './../servicos/toast.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-esqueci',
  templateUrl: './esqueci.page.html',
  styleUrls: ['./esqueci.page.scss'],
})
export class EsqueciPage implements OnInit {

  constructor(
    private toast: ToastService,
    private util: UtilService,
    private http: HttpClient,
    private validacao: ValidacaoService
  ) { }

  ngOnInit() {
  }

  enviaSenha() {
    let email = (document.getElementById('email') as HTMLInputElement).value;
    if (email.trim() == '') {
      this.toast.showToast('Informe seu endereço de e-mail', 3000);
    }
    else {
      if (!this.util.emailValido(email)) {
        this.toast.showToast('O e-mail ' + '"' + email + '"' + ' não é válido.', 3000);
      }
      else {
        this.validacao.existeUsuario(email).subscribe(dados => {
          console.log(dados.length);
          // eslint-disable-next-line eqeqeq
          if (dados.length != 0) {
            if (dados[0].novasenha == 'S') {
              this.toast.showToast('Uma nova senha já foi enviada para o e-mail ' + '"' + email + '"' + '.', 3000);
            }
            else {
              let jsonUsuario = JSON.parse(JSON.stringify({
                admin: dados[0].admin,
                imagem: dados[0].imagem,
                datanascimento: dados[0].datanascimento,
                email: (document.getElementById('email') as HTMLInputElement).value.toLowerCase().trim(),
                senha: dados[0].senha,
                novasenha: 'S',
                nome: dados[0].nome,
                sobrenome: dados[0].sobrenome
              }));

              // this.http.post<Usuario[]>(environment.api + '/' + 'EditaUsuario/', jsonUsuario).subscribe(
              //   (response) => {
              //     alert(response[0].id);
              //   },
              //   (error) => {
              //     //error() callback
              //     //alert('Request failed with error');
              //     this.toast.showToast('Não foi possível enviar a nova senha. Por favor, tente mais tarde.', 3000);
              //   },
              //   () => {
              //     //complete() callback
              //     this.toast.showToast('Uma nova senha foi enviada para o e-mail ' + '"' + email + '"' + '.', 3000);
              //     (document.getElementById('email') as HTMLInputElement).value = null;
              //   });

              this.http.post<Usuario[]>(environment.api + '/' + 'EditaUsuario/', jsonUsuario).subscribe();
              this.toast.showToast('Uma nova senha foi enviada para o e-mail ' + '"' + email + '"' + '.', 3000);
              (document.getElementById('email') as HTMLInputElement).value = null;
            }
          }
          else {
            this.toast.showToast('Não foi encontrado o cadastro para o e-mail ' + '"' + email + '"' + '.', 3000);
          }
        });
      }
    }
  }
}
