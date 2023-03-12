import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '',redirectTo:'Authentication', pathMatch:'full'},
  { path: 'Authentication', loadChildren: () => import('./core/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'dashboard', loadChildren: () => import('./core/dashboard/dashboard.module').then(m => m.DashboardModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
