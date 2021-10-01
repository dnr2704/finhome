import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/servicos/alerta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tabreceita',
  templateUrl: './tabreceita.page.html',
  styleUrls: ['./tabreceita.page.scss'],
})
export class TabreceitaPage implements OnInit {

  itens = [];

  constructor(
    private http: HttpClient,
    private alerta: AlertaService
  ) { }

  ngOnInit() {
    this.carregarItems('tipo', 'R', '0');
  }

  carregarItems(buscarpor, tipo, parametro) {
    if (buscarpor === 'tipo') {
      this.http.get(environment.api + '/' + 'ListaCategoria/' + buscarpor + '/' + tipo + '/' + '0')
        .subscribe(data => {
          this.itens = JSON.parse(JSON.stringify(data));
        });
    }
    else {
      this.http.get(environment.api + '/' + 'ListaCategoria/' + buscarpor + '/' + tipo + '/' + parametro)
        .subscribe(data => {
          this.itens = JSON.parse(JSON.stringify(data));
        });
    }
  }

  busca(ev: any) {
    const parametro = ev.target.value;
    if (parametro && parametro.trim() !== '') {
      this.carregarItems('descricao', 'R', parametro);
    }
    else
    {
      this.carregarItems('tipo', 'R', '0');
    }
  }

  excluiCategoria(id) {
    this.alerta.confirmacao('Confirmação', 'Confirma a exclusão dessa receita?', 'Cancelar', 'OK').then((res) => {
      if (res === 'ok') {
        this.http.get(environment.api + '/' + 'ExcluiCategoria/' + id).subscribe(dados => {
          this.carregarItems('tipo', 'R', '0');
        });
        (document.getElementById('sbar-catreceita') as HTMLInputElement).value = 'x';
        (document.getElementById('sbar-catreceita') as HTMLInputElement).value = '';
      }
    });
  }
}
