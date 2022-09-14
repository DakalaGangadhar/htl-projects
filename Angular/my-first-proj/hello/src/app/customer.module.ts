import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CustomerComponent } from './customer.component';
import { MasterComponent } from './master/master.component';

@NgModule({
  declarations: [
    CustomerComponent,
    LoginComponent,
    HomeComponent,
    SupplierComponent,
    MasterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [MasterComponent]
})
export class MasterModule { }
