import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimitePageRoutingModule } from './limite-routing.module';
import { NgxMaskModule, IConfig, MaskPipe } from 'ngx-mask';
import { LimitePage } from './limite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaskModule,
    LimitePageRoutingModule
  ],
  declarations: [LimitePage]
})
export class LimitePageModule {}
