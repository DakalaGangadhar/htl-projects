import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBooksComponent } from './author/create-books/create-books.component';
import { SearchComponent } from './reader/search/search.component';

const routes: Routes = [
 
  { path: 'author', component: CreateBooksComponent },
  { path: 'reader', component: SearchComponent },
  

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
