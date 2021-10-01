import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabreceitaPage } from './tabreceita.page';

const routes: Routes = [
  {
    path: '',
    component: TabreceitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabreceitaPageRoutingModule {}
