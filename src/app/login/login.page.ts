import { Tab1Page } from './../tab1/tab1.page';
/* eslint-disable eqeqeq */
import { ToastService } from './../servicos/toast.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { UtilService } from './../servicos/util.service';
import { ValidacaoService } from './../servicos/validacao.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from '../servicos/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  erro: boolean;
  msgErro = '';
  email='';
  senha ='';

  // formulario = FormGroup;
  // usuario: Usuario = {
  //   id: null,
  //   nome: null,
  //   sobrenome: null,
  //   email: '@',
  //   senha: null,
  //   imagem: null,
  //   novasenha: null,
  //   datanascimento: null,
  //   admin: null
  // };

  // eslint-disable-next-line max-len
  constructor(
    private http: HttpClient,
    private validacao: ValidacaoService,
    private util: UtilService,
    private toast: ToastService,
    private storage: StorageService,
    private rota: Router) { }

  ngOnInit() {

  }

  onSubmit(){
    this.email = (document.getElementById('email') as HTMLInputElement).value;
    this.senha = (document.getElementById('senha') as HTMLInputElement).value;
    if ((this.email.trim() === '') || (this.senha.trim() === ''))
    {
       this.toast.showToast('Informe o seu e-mail e a sua senha.',2000);
       // eslint-disable-next-line prefer-const
       let foco = this.email.trim() === '' ? 'email' : 'senha';
       document.getElementById(foco).focus();
    }
    else
    {
      if(!this.util.emailValido(this.email))
      {
        this.toast.showToast('O e-mail informado n??o ?? v??lido.', 2000);
      }
      else
      {
        this.erro = false;
        this.msgErro = '';
        try {
          this.validacao.validaAcessoUsuario(this.email, this.senha).subscribe(dados => {
            if (dados.length != 0)
            {
              this.storage.set('idusu', dados[0].id);
              this.storage.set('email', dados[0].email);
              this.rota.navigateByUrl('/tabs/tab2');
            }
            else {
              this.toast.showToast('Usu??rio n??o encontrado.',2000);
            }
          });
        }
        catch{
          this.toast.showToast('N??o foi poss??vel conectar.',2000);
        }
      }
    }

  }
}
