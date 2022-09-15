import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderComponent } from './reader/reader.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { readerroutes } from '../routing/readerroutes';
import { GridUiModule } from '../grid-ui/grid-ui.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    ReaderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(readerroutes),
    HttpClientModule,
    GridUiModule

  ],
  providers: [],
  bootstrap: [ReaderComponent]
})
export class ReaderModule { }
