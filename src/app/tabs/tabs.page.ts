/* eslint-disable quote-props */
import { LancamentoPage } from './../lancamento/lancamento.page';
import { Lancamento } from './../models/lancamento';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {


  constructor(private modal: ModalController) { }

  async openModal() {
    const modal = await this.modal.create({
      component: LancamentoPage
    });
    return await modal.present();
  }
}
