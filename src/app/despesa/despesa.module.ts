import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DespesaPageRoutingModule } from './despesa-routing.module';
import { DespesaPage } from './despesa.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig, MaskPipe } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaskModule,
    ReactiveFormsModule,
    DespesaPageRoutingModule
  ],
  declarations: [DespesaPage],
  providers: [
    MaskPipe
  ]
})
export class DespesaPageModule {}
