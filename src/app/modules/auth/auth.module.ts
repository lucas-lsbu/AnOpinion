import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignComponent } from './page/sign/sign.component';
import { ChangePasswordComponent } from './page/change-password/change-password.component';


@NgModule({
  declarations: [
    SignComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
