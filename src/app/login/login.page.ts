/* eslint-disable eqeqeq */
import { ToastService } from './../servicos/toast.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { UtilService } from './../servicos/util.service';
import { ValidacaoService } from './../servicos/validacao.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient, private validacao: ValidacaoService, private util: UtilService, private toast: ToastService) { }

  ngOnInit() {

  }

  onSubmit(){
    this.email = (document.getElementById('email') as HTMLInputElement).value;
    this.senha = (document.getElementById('senha') as HTMLInputElement).value;
    if ((this.email.trim() === '') || (this.senha.trim() === ''))
    {
       this.toast.showToast('Informe o seu e-mail e a sua senha.',2000);
       let foco = this.email.trim() === '' ? 'email' : 'senha';
       document.getElementById(foco).focus();
    }
    else
    {
      if(!this.util.emailValido(this.email))
      {
        this.toast.showToast('O e-mail informado não é válido.', 2000);
      }
      else
      {
        this.erro = false;
        this.msgErro = '';
        try {
          this.validacao.validaAcessoUsuario(this.email, this.senha).subscribe(dados => {
            if (dados.length > 0)
            {
                // localStorage.setItem('auth_token', email);
                // this.util.autenticado = true;
                // this.util.tipo = this.util.GetValorJson(Usuario,'tipo');
                //this.rotaIndex.navigate(["/index"]);
                //dados[0].
                this.toast.showToast(dados.length.toString(),2000);
                //this.toast.showToast('ok.',2000);
            }
            else {
              this.toast.showToast('Usuário não encontrado.',2000);
            }
          });
        }
        catch{
          this.toast.showToast('Não foi possível conectar.',2000);
        }
      }
    }

  }
}
