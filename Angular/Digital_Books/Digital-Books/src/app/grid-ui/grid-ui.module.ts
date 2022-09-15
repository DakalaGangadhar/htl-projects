import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridUiComponent } from './grid-ui/grid-ui.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GridUiComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[GridUiComponent,CommonModule]
})
export class GridUiModule { }
