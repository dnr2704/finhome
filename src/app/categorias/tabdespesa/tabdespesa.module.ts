import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabdespesaPageRoutingModule } from './tabdespesa-routing.module';

import { TabdespesaPage } from './tabdespesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabdespesaPageRoutingModule
  ],
  declarations: [TabdespesaPage]
})
export class TabdespesaPageModule {}
