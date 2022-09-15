import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { LoginComponent } from './login/login.component';
import { CreateBookComponent } from './create-book/create-book.component';


@NgModule({
  declarations: [
    LoginComponent,
    CreateBookComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule
  ]
})
export class AuthorModule { }
