import { TabscatPage } from './categorias/tabscat/tabscat.page';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
/*  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }, */

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'esqueci',
    loadChildren: () => import('./esqueci/esqueci.module').then( m => m.EsqueciPageModule)
  },
  {
    path: 'despesas',
    loadChildren: () => import('./despesas/despesas.module').then( m => m.DespesasPageModule)
  },
  {
    path: 'contas',
    loadChildren: () => import('./contas/contas.module').then( m => m.ContasPageModule)
  },
  {
    path: 'despesa/:id',
    loadChildren: () => import('./despesa/despesa.module').then( m => m.DespesaPageModule)
  },
  {
    path: 'conta/:id',
    loadChildren: () => import('./conta/conta.module').then( m => m.ContaPageModule)
  },
  {
    path: 'tabreceita',
    loadChildren: () => import('./categorias/tabreceita/tabreceita.module').then( m => m.TabreceitaPageModule)
  },
  {
    path: 'tabdespesa',
    loadChildren: () => import('./categorias/tabdespesa/tabdespesa.module').then( m => m.TabdespesaPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/tabscat/tabscat.module').then( m => m.TabscatPageModule)
  },
  {
    path: 'categoria/:id/:tipo',
    loadChildren: () => import('./categorias/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'limites',
    loadChildren: () => import('./limites/limites.module').then( m => m.LimitesPageModule)
  },
  {
    path: 'limite/:id',
    loadChildren: () => import('./limite/limite.module').then( m => m.LimitePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
