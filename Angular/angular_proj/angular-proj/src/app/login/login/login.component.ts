import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UserData } from './models/userdata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service:LoginServiceService) { }

  UserDataModel:UserData=new UserData();
  ngOnInit(): void {
  }

  loginUser(){
    this._service.loginUser(this.UserDataModel).subscribe(res=>{
      console.log('Hi You are able to login');
      alert('Hi');
      localStorage.setItem('token',res.token);
    },res=>console.log(res));
  }

}
