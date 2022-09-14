import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier/supplier.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { supplierroutes } from '../routing/supplierroutes';
import { GridUiModule } from '../utilites/grid-ui.module';
import { EmpSupplierComponent } from './emp-supplier/emp-supplier.component';



@NgModule({
  declarations: [
    SupplierComponent,
    EmpSupplierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(supplierroutes),
    GridUiModule
  ]
})
export class SupplierModule { }
