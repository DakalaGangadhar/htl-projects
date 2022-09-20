import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master/master.component';
import { BrowserModule } from '@angular/platform-browser';
import { MasterHomeComponent } from './master-home/master-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Mainroutes } from '../routing/mainroutes';



@NgModule({
  declarations: [
    MasterComponent,
    MasterHomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Mainroutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [MasterComponent]
})
export class MasterModule { }
