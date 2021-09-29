/* eslint-disable prefer-const */
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService {

  constructor(private http: HttpClient, private toast: ToastService, private util: UtilService) { }

  ajustaJson(chave) {
    return chave.slice(chave.indexOf(':') + 1, chave.length).replace(/'/g, '');
  };

  validaAcessoUsuario(email, senha) {
    return this.http.get<Usuario[]>(environment.api + '/' + 'AcessoUsuario/' + `${email}/${senha}`);

  }

  verificaObrigatorio() {
    let elementos = document.getElementsByTagName('input');
    let validou = false;
    for (let i = 0, max = elementos.length; i < max; i++) {
      if ((elementos[i].required) && (elementos[i].value.trim() === '')) {
        this.toast.showToast('O campo ' + '"' + elementos[i].name + '"' + ' é obrigatório.', 2000);
        validou = false;
        break;
      }
      else {
        validou = true;
      }
    };
    if (validou) {
      for (let i = 0, max = elementos.length; i < max; i++) {
        if (elementos[i].name.toLowerCase().replace('-','') === 'email') {
          if (!this.util.emailValido(elementos[i].value)) {
            this.toast.showToast('O e-mail ' + '"' + elementos[i].value.toLowerCase() + '"' + ' não é válido.', 2000);
            validou = false;
            break;
          }
        }
        else {
          validou = true;
        }
      };
    }
    return validou;
  }

  dadosUsuario(email) {
    let senha = '0';
    return this.http.get<Usuario[]>(environment.api + '/' + 'DadosUsuario/' + `${email}/${senha}`);
  }

  existeUsuario(email) {
    let senha = '0';
    return this.http.get<Usuario[]>(environment.api + '/' + 'ExisteUsuario/' + `${email}/${senha}`);
  }
}
