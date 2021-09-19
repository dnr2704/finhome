import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  ajustaJson(chave) {
    return chave.slice(chave.indexOf(':') + 1, chave.length).replace(/'/g, '');
  }

  emailValido(email: string){
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
  }

  getValorJson(objeto, chave) {
    let valorChave = null;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < objeto.length; i++) {
      if (objeto[i].toString().indexOf(chave) !== -1) {
        valorChave = this.ajustaJson(objeto[i]) ;
        break;
      }
    }
    return valorChave;
  }
}
