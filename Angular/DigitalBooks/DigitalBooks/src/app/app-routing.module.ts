import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBooksComponent } from './author/create-books/create-books.component';
import { ReaderModuleModule } from './reader-module/reader-module.module';
import { LoginComponent } from './reader/login/login.component';
import { SearchComponent } from './reader/search/search.component';
import { SignupComponent } from './reader/signup/signup.component';

const routes: Routes = [
 
  { path: 'author', component: CreateBooksComponent },
  { path: 'reader', component: SearchComponent},
  { path: 'readermodule', loadChildren: () => import('./reader-module/reader-module.module').then(m => m.ReaderModuleModule) },
  
  

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
