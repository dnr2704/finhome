import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabscatPage } from './tabscat.page';

const routes: Routes = [
  {
    path: '',
    component: TabscatPage,
    children: [
      {
        path: 'tabdespesa',
        loadChildren: () => import('../tabdespesa/tabdespesa.module').then(m => m.TabdespesaPageModule)
      },
      {
        path: 'tabreceita',
        loadChildren: () => import('../tabreceita/tabreceita.module').then(m => m.TabreceitaPageModule)
      },
      {
        path: '',
        redirectTo: '/categorias/tabreceita',
        pathMatch: 'full'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabscatPageRoutingModule {}
