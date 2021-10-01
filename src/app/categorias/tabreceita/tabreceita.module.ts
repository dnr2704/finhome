import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabreceitaPageRoutingModule } from './tabreceita-routing.module';

import { TabreceitaPage } from './tabreceita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabreceitaPageRoutingModule
  ],
  declarations: [TabreceitaPage]
})
export class TabreceitaPageModule {}
