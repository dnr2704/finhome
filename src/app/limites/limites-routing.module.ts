import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LimitesPage } from './limites.page';

const routes: Routes = [
  {
    path: '',
    component: LimitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitesPageRoutingModule {}
