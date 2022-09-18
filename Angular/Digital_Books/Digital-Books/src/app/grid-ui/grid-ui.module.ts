import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridUiComponent } from './grid-ui/grid-ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { gridroutes } from '../routing/gridroutes';



@NgModule({
  declarations: [
    GridUiComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(gridroutes)
  ],
  exports:[GridUiComponent,CommonModule]
})
export class GridUiModule { }
