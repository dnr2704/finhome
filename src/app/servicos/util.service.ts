/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor() { }

  ajustaData(valor, formato) {
    //2021-01-10T00:00:00
    let novaData;
    // eslint-disable-next-line prefer-const
    let vetorData = valor.split('-');
    vetorData[2] = vetorData[2].toString().substring(0, 2);
    switch (formato) {
      case 'dd-mm-yyyy': novaData = vetorData[2] + '-' + vetorData[1] + '-' + vetorData[0]; break;
      case 'dd/mm/yyyy': novaData = vetorData[2] + '/' + vetorData[1] + '/' + vetorData[0]; break;
      case 'yyyy/mm/dd': novaData = vetorData[0] + '/' + vetorData[1] + '/' + vetorData[2]; break;
      case 'yyyy-mm-dd': novaData = vetorData[0] + '-' + vetorData[1] + '-' + vetorData[2]; break;
    }
    return novaData;
  }

  ajustaJson(chave) {
    return chave.slice(chave.indexOf(':') + 1, chave.length).replace(/'/g, '');
  }

  ajustaValor(currency, valor) {
    if (currency) {
      // valor = valor.replace(',','*');
      // valor = valor.replace(',','.');
      // valor = valor.replace('*',',');
    }
    else {
      if ((valor.indexOf('.') !== 0) && (valor.indexOf(',') <= 0)) {
        valor = valor.trim();
      }
      else {
        if ((valor.indexOf('.') !== 0) && (valor.indexOf(',') !== 0)) {
          valor = valor.replace('.', 'z');
          valor = valor.replace('.', 'z');
          valor = valor.replace('.', 'z');
          valor = valor.replace('.', 'z');
          valor = valor.replace('.', 'z');
          valor = valor.replace('.', 'z');
          valor = valor.replace(',','.');
          valor = valor.replace(/z/g, '');
        }
        else {
          if ((valor.indexOf('.') <= 0) && (valor.indexOf(',') != 0)) {
            valor = valor.replace(/,/g, '.');
          }
          else {
            // if ((valor.indexOf('.') <= 0) && (valor.indexOf(',') != 0)) {
            //   valor = valor.replace(',','.');
          }
        }
      }
      return valor;
    }
  }

    emailValido(email: string) {
      // eslint-disable-next-line prefer-const
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return email.match(validRegex);
    }

    getValorJson(objeto, chave) {
      let valorChave = null;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < objeto.length; i++) {
        if (objeto[i].toString().indexOf(chave) !== -1) {
          valorChave = this.ajustaJson(objeto[i]);
          break;
        }
      }
      return valorChave;
    }

    limpaInput() {
      let elementos = document.getElementsByTagName('input');
      for (let i = 0, max = elementos.length; i < max; i++) {
        elementos[i].value = '';
      }
    }

    setValorInput(input, valor) {
      (document.getElementById(input) as HTMLInputElement).value = valor;
    }
  }
