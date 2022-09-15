import { Component, OnInit } from '@angular/core';
import { RegisterModel } from 'src/app/models/RegisterModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  RegisterModel:RegisterModel=new RegisterModel();
  ngOnInit(): void {
  }
  registerUser(){
    
  }

}
