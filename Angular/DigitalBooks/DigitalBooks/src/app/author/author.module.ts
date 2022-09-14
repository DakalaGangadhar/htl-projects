import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBooksComponent } from './create-books/create-books.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CreateBooksComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[CreateBooksComponent]
})
export class AuthorModule { }
