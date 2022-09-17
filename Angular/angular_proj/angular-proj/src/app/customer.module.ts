import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { customerroutes } from './routing/customerroutes';
import { GridUiModule } from './utilites/grid-ui.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RegisterComponent } from './register/register/register.component';
import { LoginServiceService } from './services/login-service.service';

@NgModule({
  declarations: [
    CustomerComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(customerroutes),
    GridUiModule,
    HttpClientModule 
  ],
  providers: [LoginServiceService],
  bootstrap: [CustomerComponent]
})
export class CustomerModule { }