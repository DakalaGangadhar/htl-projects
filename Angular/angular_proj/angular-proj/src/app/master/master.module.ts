import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Mainroutes } from '../routing/mainroutes';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login/login.component';


@NgModule({
  declarations: [
    HomeComponent,
    MasterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(Mainroutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [MasterComponent]
})
export class MasterModule { }