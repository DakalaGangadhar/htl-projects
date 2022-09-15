import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    SearchComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[SearchComponent]
 
})
export class ReaderModule { }
