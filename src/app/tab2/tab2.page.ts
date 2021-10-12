import { catchError } from 'rxjs/internal/operators/catchError';
/* eslint-disable max-len */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Router } from '@angular/router';
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
import { StorageService } from './../servicos/storage.service';
/* eslint-disable no-var */
import { ValidacaoService } from './../servicos/validacao.service';
import { environment } from 'src/environments/environment';
import { Usuario } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  saudacao: string;
  usuario: string;
  saldoUsuario: string;
  mostrarValor: boolean = true;

  slideOpts: any = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private validacao: ValidacaoService,
    private storage: StorageService,
    private rota: Router,
    private http: HttpClient
  ) {}


  ngOnInit() {
    var usuario: Usuario[];
    let hora = new Date().getHours();
    let emailUsuario = this.storage.get('email');
    this.validacao.existeUsuario(emailUsuario).subscribe(
      (response) => {
        this.usuario = response[0].nome;
      },
      (error) => {//error() callback
        alert('Request failed with error');

      },
      () => (response) => {
        this.usuario = response[0].nome;
      });
    if ((emailUsuario == null) || (emailUsuario == '')) {
      this.rota.navigateByUrl('/login');
    }
    else {
      this.saudacao = ((hora >= 1) && (hora <= 12)) ? 'Bom dia' : ((hora >= 13) && (hora <= 18)) ? 'Boa tarde' : 'Boa noite';
    }
    this.http.get(environment.api + '/' + 'SaldoUsuario/' + `${this.storage.get('idusu')}`).subscribe(retorno => this.saldoUsuario = retorno.toString());
    this.mostrarValor = this.storage.get('mostraValores') == 'S';
  }

  mostraValores() {
    //document.getElementById('h1saldo').innerText = this.mostrarValor ? this.saldoUsuario : 'R$-,--';
    if (this.mostrarValor) {
      this.storage.set('mostraValores', 'S');
    } else {
      this.storage.set('mostraValores', 'N');
    }
  }
}
