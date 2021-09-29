import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContaPageRoutingModule } from './conta-routing.module';
import { NgxMaskModule, IConfig, MaskPipe } from 'ngx-mask';
import { ContaPage } from './conta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaskModule,
    ContaPageRoutingModule
  ],
  declarations: [ContaPage]
})
export class ContaPageModule {}
