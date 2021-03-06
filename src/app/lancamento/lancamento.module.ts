import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LancamentoPageRoutingModule } from './lancamento-routing.module';
import { NgxMaskModule, IConfig, MaskPipe } from 'ngx-mask';
import { LancamentoPage } from './lancamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaskModule,
    LancamentoPageRoutingModule
  ],
  declarations: [LancamentoPage]
})
export class LancamentoPageModule {}
