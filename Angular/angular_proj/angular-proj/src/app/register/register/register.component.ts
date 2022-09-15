import { Component, OnInit } from '@angular/core';
import { RegisterDataModel } from 'src/app/login/login/models/RegisterDataModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  RegisterData:RegisterDataModel=new RegisterDataModel();
  ngOnInit(): void {
  }
  registerUser(){
    
  }

}
