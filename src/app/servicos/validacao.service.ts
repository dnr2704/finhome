import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoService {

  constructor(private http: HttpClient) { }

  ajustaJson(chave) {
    return chave.slice(chave.indexOf(':') + 1, chave.length).replace(/'/g, '');
  };

  validaAcessoUsuario(email, senha) {
    return this.http.get<Usuario[]>(environment.api + '/' + 'AcessoUsuario/' + `${email}/${senha}`);

  }

}
