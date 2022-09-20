import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderComponent } from './reader/reader.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { readerroutes } from '../routing/readerroutes';
import { GridUiModule } from '../grid-ui/grid-ui.module';
import { LoginComponent } from './login/login.component';
import { ReaderServiceService } from '../services/reader-service.service';

import { TokenInterceptorService } from '../services/tokenInceptorservice';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    ReaderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(readerroutes),
    HttpClientModule,
    GridUiModule

  ],
  providers: [ReaderServiceService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},{provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService],
  bootstrap: [ReaderComponent]
})
export class ReaderModule { }
