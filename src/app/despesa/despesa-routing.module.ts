import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespesaPage } from './despesa.page';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: DespesaPage
  }
];

@NgModule({
  imports: [
    BrMaskerModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class DespesaPageRoutingModule {}
