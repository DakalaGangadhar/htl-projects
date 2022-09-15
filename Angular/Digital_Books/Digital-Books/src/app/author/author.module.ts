import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author/author.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authorroutes } from '../routing/authorroutes';
import { GridUiModule } from '../grid-ui/grid-ui.module';



@NgModule({
  declarations: [
    AuthorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authorroutes),
    GridUiModule
  ]
})
export class AuthorModule { }
