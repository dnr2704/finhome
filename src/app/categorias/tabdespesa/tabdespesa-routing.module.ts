import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabdespesaPage } from './tabdespesa.page';

const routes: Routes = [
  {
    path: '',
    component: TabdespesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabdespesaPageRoutingModule {}
