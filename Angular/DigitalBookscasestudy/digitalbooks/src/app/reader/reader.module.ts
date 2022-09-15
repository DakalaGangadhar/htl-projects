import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaderRoutingModule } from './reader-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchBookComponent } from './search-book/search-book.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SearchBookComponent
  ],
  imports: [
    CommonModule,
    ReaderRoutingModule
  ]
})
export class ReaderModule { }
