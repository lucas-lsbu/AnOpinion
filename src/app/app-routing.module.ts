import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { AuthGuard } from "@angular/fire/auth-guard";

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['auth'])
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  { 
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import ('./modules/auth/auth.module').then(module => module.AuthModule),
    canActivate: [AuthGuard], data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    loadChildren: () => import ('./modules/dashboard/dashboard.module').then(module => module.DashboardModule),
    canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorizedToAuth }
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
