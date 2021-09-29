import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertaService } from '../servicos/alerta.service';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html',
  styleUrls: ['./contas.page.scss'],
})
export class ContasPage implements OnInit {

  itens = [];

  constructor(
    private http: HttpClient,
    private alerta: AlertaService
  ) { }

  carregarItems(tipo, parametro) {
    this.http.get(environment.api + '/' + 'ListaConta/' + tipo + '/' + parametro)
      .subscribe(data => {
        this.itens = JSON.parse(JSON.stringify(data));
      });
  }

  ngOnInit() {
    this.carregarItems('a', '0');
  }

  busca(ev: any) {
    const parametro = ev.target.value;
    if (parametro && parametro.trim() !== '') {
      this.carregarItems('instituicao', parametro);
    }
    else {
      this.carregarItems('a', '0');
    }
  }

  excluiConta(id) {
    this.alerta.confirmacao('Confirmação', 'Confirma a exclusão dessa conta?', 'Cancelar', 'OK').then((res) => {
      if (res === 'ok') {
        this.http.get(environment.api + '/' + 'ExcluiConta/' + id).subscribe(dados => {
          this.carregarItems('a', '0');
        });
        (document.getElementById('searchbar-categoria') as HTMLInputElement).value = 'x';
        (document.getElementById('searchbar-categoria') as HTMLInputElement).value = '';
      }
    });
  }
}
