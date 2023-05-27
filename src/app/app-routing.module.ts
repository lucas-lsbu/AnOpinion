import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { 
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import ('./modules/auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    loadChildren: () => import ('./modules/dashboard/dashboard.module').then(module => module.DashboardModule)
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
