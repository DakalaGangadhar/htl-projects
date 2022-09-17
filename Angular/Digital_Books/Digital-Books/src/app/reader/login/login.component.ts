import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service:LoginServiceService,private _router:Router) { }

  UserModel:UserModel=new UserModel();
  public domain:any=window.location.href;
  domainArray:Array<any>=new Array<any>();
  ngOnInit(): void {
  }

  loginUser(){
    this._service.loginUser(this.UserModel).subscribe(res=>{
      alert('Hi');
      localStorage.setItem('token',res.token);
      this._router.navigate(['reader/add']);
    },res=>console.log(res));
  }
  redirecttoregisterUser(){
    this._router.navigate(['reader/register']);
  }
  
}
