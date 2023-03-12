import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent, children: [
  {path:'', redirectTo:'farmers', pathMatch:'full'},
  { path: 'farmers', loadChildren: () => import('../../components/farmers/farmers.module').then(m => m.FarmersModule) },
  { path: 'experts', loadChildren: () => import('../../components/experts/experts.module').then(m => m.ExpertsModule) },
  { path: 'products', loadChildren: () => import('../../components/products/products.module').then(m => m.ProductsModule) },
  { path: 'problems', loadChildren: () => import('../../components/problems/problems.module').then(m => m.ProblemsModule) },
  { path: 'chats', loadChildren: () => import('../../components/chats/chats.module').then(m => m.ChatsModule) },
  { path: 'statics', loadChildren: () => import('../../components/statics/statics.module').then(m => m.StaticsModule)},
]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
