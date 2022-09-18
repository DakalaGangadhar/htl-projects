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

  constructor(private _serviceLogin:LoginServiceService,private _router:Router) { }

  UserModel:UserModel=new UserModel();
  public domain:any=window.location.href;
  domainArray:Array<any>=new Array<any>();
  ngOnInit(): void {
  }

  loginUser(){

    this.domainArray=window.location.href.split("/", 5);
    if(this.domainArray[3]=="reader"){

      this._serviceLogin.loginReader(this.UserModel).subscribe(res=>{
        alert('Login Successfully');
        localStorage.setItem('token',res.token);
        localStorage.setItem('readeremailid',this.UserModel.Username);
        this._router.navigate(['reader/add']);
      },res=>console.log(res));
    }else{     

      this._serviceLogin.loginAuthor(this.UserModel).subscribe(res=>{
        alert('Login Successfully');
        localStorage.setItem('token',res.token);
        localStorage.setItem('authoremailid',this.UserModel.Username);
        this._router.navigate(['author/add']);
      },res=>console.log(res));
    }
    
  }
  redirecttoregisterUser(){
    this.domainArray=window.location.href.split("/", 5);
    if(this.domainArray[3]=="reader"){
      this._router.navigate(['reader/register']);
    }else{
      this._router.navigate(['author/register']);
    }

    
  }
  
}
