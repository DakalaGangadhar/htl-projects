import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridUiComponent } from './grid-ui/grid-ui.component';



@NgModule({
  declarations: [
    GridUiComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[GridUiComponent,CommonModule]
})
export class GridUiModule { }
