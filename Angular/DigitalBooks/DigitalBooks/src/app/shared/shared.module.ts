import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ReaderHeaderComponent } from './reader-header/reader-header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ReaderHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent,ReaderHeaderComponent]
})
export class SharedModule { }
