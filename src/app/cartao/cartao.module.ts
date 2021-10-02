import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaoPageRoutingModule } from './cartao-routing.module';

import { CartaoPage } from './cartao.page';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaskModule,
    CartaoPageRoutingModule
  ],
  declarations: [CartaoPage]
})
export class CartaoPageModule {}
