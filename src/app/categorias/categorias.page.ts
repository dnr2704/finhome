import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertaService } from '../servicos/alerta.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  itensReceitas = [];
  itensDespesas = [];
  tipoCategoria = 'R'; //D-espesas ou R-eceitas

  constructor(
    private http: HttpClient,
    private alerta: AlertaService
  ) { }

  carregarItems(buscarpor, tipo, parametro) {
    if (buscarpor === 'tipo') {
      this.http.get(environment.api + '/' + 'ListaCategoria/' + buscarpor + '/' + tipo + '/' + parametro)
        .subscribe(data => {
          if (tipo === 'R') {
            this.itensReceitas = JSON.parse(JSON.stringify(data));
          }
          else {
            this.itensDespesas = JSON.parse(JSON.stringify(data));
          }
        });
    }
  }

  busca(ev: any) {
    const parametro = ev.target.value;
    if (parametro && parametro.trim() !== '') {
      if (this.tipoCategoria === 'R') {
        this.carregarItems('tipo', 'R', parametro);
      }
      else {
        this.carregarItems('tipo', 'D', parametro);
      }
    }
    else {
      if (this.tipoCategoria === 'R') {
        this.carregarItems('tipo', 'R', '');
      }
      else {
        this.carregarItems('tipo', 'D', '');
      }
    }
  }

  excluiCategoria(id) {
    this.alerta.confirmacao('Confirmação', 'Confirma a exclusão dessa categoria?', 'Cancelar', 'OK').then((res) => {
      if (res === 'ok') {
        this.http.get(environment.api + '/' + 'ExcluiCategoria/' + id).subscribe(dados => {
          if (this.tipoCategoria === 'R') {
            this.carregarItems('tipo', 'R', '');
          }
          else {
            this.carregarItems('tipo', 'D', '');
          }
        });
        (document.getElementById('searchbar-conta') as HTMLInputElement).value = 'x';
        (document.getElementById('searchbar-conta') as HTMLInputElement).value = '';
      }
    });
  }

  ngOnInit() {
    if (this.tipoCategoria === 'R') {
      this.carregarItems('tipo', 'R', '');
    }
    else {
      this.carregarItems('tipo', 'D', '');
    }
  }
}
