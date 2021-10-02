import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimitesPageRoutingModule } from './limites-routing.module';

import { LimitesPage } from './limites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LimitesPageRoutingModule
  ],
  declarations: [LimitesPage]
})
export class LimitesPageModule {}
