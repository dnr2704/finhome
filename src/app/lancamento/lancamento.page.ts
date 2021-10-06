import { Router } from '@angular/router';
/* eslint-disable eqeqeq */
import { ToastService } from './../servicos/toast.service';
/* eslint-disable object-shorthand */
import { UtilService } from './../servicos/util.service';
import { ValidacaoService } from './../servicos/validacao.service';
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Categoria } from './../models/categoria';
import { HttpClient } from '@angular/common/http';
/* eslint-disable prefer-const */
/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as $ from 'jquery';
import { NgxMaskModule } from 'ngx-mask';
import { MaskPipe } from 'ngx-mask';
import { environment } from 'src/environments/environment';
import { StorageService } from '../servicos/storage.service';
import { Usuario } from '../models/usuario';
import { Lancamento } from '../models/lancamento';
import { AlertaService } from '../servicos/alerta.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.page.html',
  styleUrls: ['./lancamento.page.scss'],
})
export class LancamentoPage implements OnInit {

  categorias = [];
  cartoes = [];
  contas = [];
  usuarios = [];
  desabilita = 'disabled';

  constructor(
    private modal: ModalController,
    private http: HttpClient,
    private storage: StorageService,
    private util: UtilService,
    private toast: ToastService,
    private alerta: AlertaService,
    private rota: Router,
    private validacao: ValidacaoService
  ) { }

  ngOnInit() {
    this.listaCategorias('D');
    $('#slcategoria').append('<option id="0">--Selecione--</option>');
    this.listaFormasPagamento();
    let dataAtual = new Date().toISOString().slice(0, 10);
    $('#data').val(dataAtual);
    this.permiteParcelar();
    $('#slusuario').attr('disabled', 'disabled');
    this.listaUsuario();
  }

  changeColor(tipo: any) {
    let color = tipo === 'D' ? 'f28080' : '90EE90';
    $('#lbdesprec').css('font-weight', 'bold');
    $('#lbdesprec').empty();
    if (tipo === 'D') {
      $('#lbdesprec').append('Despesa');
    }
    else {
      $('#lbdesprec').append('Receita');
    }
    this.listaCategorias(tipo);
    $('#divcolor').css('background-color', '#' + color);
  }

  closeModal() {
    this.modal.dismiss({
      'dismissed': true
    });
  }

  listaCategorias(tipo) {
    this.http.get(environment.api + '/' + 'ListaCategoria/tipo/' + tipo + '/0')
      .subscribe(data => {
        this.categorias = JSON.parse(JSON.stringify(data));
        $('#slcategoria').empty();
        if (tipo === 'R') {
          $('#slcategoria').append('<option id="0" value="0">--Selecione--</option>');
        } else {
          {
            $('#slcategoria').append('<option id="0" value="0">--Selecione--</option>');
          }
        }
        for (var i = 0; i < this.categorias.length; i++) {
          $('#slcategoria').append('<option id="' + this.categorias[i].id + '" value=' + this.categorias[i].id + '>' + this.categorias[i].descricao + '</option>');
        }
      });
  }

  listaFormasPagamento() {
    $('#slformapagto').empty();
    $('#slformapagto').append('<option id="0" value="0">--Selecione--</option>');
    this.http.get(environment.api + '/' + 'ListaCartao/idusu' + '/' + this.storage.get('idusu') + '/0')
      .subscribe(data => {
        this.cartoes = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < this.cartoes.length; i++) {
          $('#slformapagto').append('<option id="' + 'CC' + this.cartoes[i].id + '" value=' + 'CC' + this.cartoes[i].id + '>' + this.cartoes[i].descricao + '</option>');
        }
      });

    this.http.get(environment.api + '/' + 'ListaConta/idusu' + '/' + this.storage.get('idusu') + '/0')
      .subscribe(data2 => {
        this.contas = JSON.parse(JSON.stringify(data2));
        for (var i = 0; i < this.contas.length; i++) {
          $('#slformapagto').append('<option id="' + 'CO' + this.contas[i].id + '" value=' + 'CO' + this.contas[i].id + '>' + this.contas[i].nome + '</option>');
        }
      });
  }

  listaUsuario() {
    $('#slusuario').empty();
    $('#slusuario').append('<option id="0" value="0">--Selecione--</option>');
    $('#slusuario').append('<option id="R" value="R">(Rateio)</option>');
    this.http.get(environment.api + '/' + 'ListaUsuario')
      .subscribe(data => {
        this.usuarios = JSON.parse(JSON.stringify(data));
        let idLogado = this.storage.get('idusu');
        for (var i = 0; i < this.usuarios.length; i++) {
          if (idLogado != this.usuarios[i].id) {
            $('#slusuario').append('<option id="' + this.usuarios[i].id + '" value=' + this.usuarios[i].id + '>' + this.usuarios[i].nome + '</option>');
          }
        }
      });
  }

  permiteParcelar() {
    var valorSelect = ($('#slformapagto').find(':selected').val()).substring(0, 2);
    if ((valorSelect === '0') || (valorSelect === 'CO')) //
    {
      $('#slparcela').attr('disabled', 'disabled');
      $('#slparcela').val($('#slparcela option:eq(0)').val());
      $('#chkfaturaAtual').prop('disabled', true);
      $('#lbfaturaAtual').addClass('disabled');
    } else {
      $('#slparcela').removeAttr('disabled');
      $('#chkfaturaAtual').prop('disabled', false);
      $('#lbfaturaAtual').removeClass('disabled');
    }
  }

  adicionaPagador() {

    //!$('#chkminhadespesa')[0].checked
    if (!$('#chkminhadespesa')[0].checked === true) {
      $('#slusuario').removeAttr('disabled');
    }
    else {
      $('#slusuario').attr('disabled', 'disabled');
    }
  }

  salvar() {
    let valor = (document.getElementById('valor') as HTMLInputElement).value.replace('R$', '').trim();
    if (valor.trim() === '') {
      this.toast.showToast('Informe o valor do lançamento.', 3000);
    }
    else {
      if (this.validacao.verificaObrigatorio() == true) {
        let data = (document.getElementById('data') as HTMLInputElement).value;
        data = this.util.ajustaData(data, 'yyyy-mm-dd');
        let descricao = (document.getElementById('descricao') as HTMLInputElement).value;
        valor = this.util.ajustaValor(false, valor);
        let idcat = (document.getElementById('slcategoria') as HTMLInputElement).value;
        if (idcat.trim() == '0') {
          this.toast.showToast('Informe o tipo de ' + $('#lbdesprec').text().toLowerCase() + ' do lançamento.', 3000);
        }
        else {
          var valorSelect = ($('#slformapagto').find(':selected').val()).substring(0, 2);
          let idcon = valorSelect === 'CO' ? (document.getElementById('slformapagto') as HTMLInputElement).value.replace('CO', '') : null;
          let idcar = valorSelect === 'CC' ? (document.getElementById('slformapagto') as HTMLInputElement).value.replace('CC', '') : null;
          let parcelas = valorSelect == 'CC' ? (document.getElementById('slparcela') as HTMLInputElement).value.substr(1, 2) : 1;
          let faturaAtual = (!$('#chkfaturaAtual')[0].checked === false) ? 'S' : 'N';
          if ((idcon === null) && (idcar === null)) {
            this.toast.showToast('Informe qual a forma de pagamento do lançamento.', 3000);
          } else {
            let pagador = this.storage.get('idusu');
            let minhaDepesa = (!$('#chkminhadespesa')[0].checked === false);
            let temPagador = true;
            if (minhaDepesa == false) {
              pagador = (document.getElementById('slusuario') as HTMLInputElement).value;
              if (pagador == 0) {
                this.toast.showToast('Informe o responsável pelo pagamento.', 3000);
                temPagador = false;
              }
              else {
                temPagador = true;
              }
            }
            if (temPagador) {
              this.http.get<Usuario[]>(environment.api + '/' + 'ExisteUsuario/' + this.storage.get('email') + '/0').subscribe(dados => {
                let jsonDados = JSON.parse(JSON.stringify({
                  id: 0,
                  data: data,
                  descricao: descricao,
                  valor: valor,
                  idcat: idcat,
                  idcon: idcon,
                  idcar: idcar,
                  pagador: pagador,
                  faturaatual: faturaAtual,
                  parcelas: parcelas,
                  observacoes: (document.getElementById('observacoes') as HTMLInputElement).value
                }));
                this.http.post<Lancamento[]>(environment.api + '/' + 'SalvaLancamento/', jsonDados).subscribe();
                this.alerta.confirmacao('Confirmação', 'Lançamento realizado com sucesso. Deseja realizar um novo lançamento?', 'Cancelar', 'OK').then((res) => {
                  if (res === 'ok') {
                    this.util.limpaInput();
                    let dataAtual = new Date().toISOString().slice(0, 10);
                    $('#data').val(dataAtual);
                    $('#slformapagto').val($('#slformapagto option:eq(0)').val());
                    $('#slcategoria').val($('#slcategoria option:eq(0)').val());
                    $('#slparcela').val($('#slparcela option:eq(0)').val());
                    $('#slparcela').attr('disabled', 'disabled');
                    $('#chkfaturaAtual').prop('checked', false);
                    $('#lbfaturaAtual').addClass('disabled');
                  }
                  else {
                    this.closeModal();
                    this.rota.navigateByUrl('/tabs/tab2');
                  }
                });
              });
            }
          }
        }
      }
    }
  }
}
