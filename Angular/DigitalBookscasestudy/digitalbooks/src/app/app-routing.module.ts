import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBookComponent } from './author/create-book/create-book.component';
import { SearchBookComponent } from './reader/search-book/search-book.component';

const routes: Routes = [
 // { path: 'reader', loadChildren: () => import('./reader/reader.module').then(m => m.ReaderModule) },
  //{ path: 'author', loadChildren: () => import('./author/author.module').then(m => m.AuthorModule) },
  { path: 'reader', component:SearchBookComponent},
  { path: 'author', component:CreateBookComponent}
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
