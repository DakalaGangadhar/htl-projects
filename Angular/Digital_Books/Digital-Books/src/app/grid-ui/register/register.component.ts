import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/RegisterModel';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(private _serviceReader:LoginServiceService,private _serviceRegister:RegisterServiceService,private _router:Router) { }
  RegisterModel:RegisterModel=new RegisterModel();
  domain:Array<any>=new Array<any>();
  ngOnInit(): void {
  }
  registerUser(){
    debugger;
    this.domain=window.location.href.split("/", 5);
    if(this.domain[3]=="reader"){
      this._serviceRegister.registerReader(this.RegisterModel).subscribe(res=>{
        alert('Hi');
        localStorage.setItem('token',res.token);
       // this._router.navigate(['reader/register']);
      },res=>console.log(res));

    }else{
      this._serviceRegister.registerAuthor(this.RegisterModel).subscribe(res=>{
        alert('Hi');
        localStorage.setItem('token',res.token);
       // this._router.navigate(['reader/register']);
      },res=>console.log(res));

    }

    
    
  
  }

}
