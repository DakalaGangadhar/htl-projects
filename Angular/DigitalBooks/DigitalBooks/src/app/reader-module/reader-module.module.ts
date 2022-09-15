import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderModuleRoutingModule } from './reader-module-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReaderModuleRoutingModule
  ]
})
export class ReaderModuleModule { }
