import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service:LoginServiceService) { }

  UserModel:UserModel=new UserModel();
  ngOnInit(): void {
  }

  loginUser(){
    this._service.loginUser(this.UserModel).subscribe(res=>{
      console.log('Hi You are able to login');
      alert('Hi');
      localStorage.setItem('token',res.token);
    },res=>console.log(res));
  }

}
