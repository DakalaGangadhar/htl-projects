import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { customerroutes } from './routing/customerroutes';
import { GridUiModule } from './utilites/grid-ui.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(customerroutes),
    GridUiModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [CustomerComponent]
})
export class CustomerModule { }