import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabscatPageRoutingModule } from './tabscat-routing.module';

import { TabscatPage } from './tabscat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabscatPageRoutingModule
  ],
  declarations: [TabscatPage]
})
export class TabscatPageModule {}
