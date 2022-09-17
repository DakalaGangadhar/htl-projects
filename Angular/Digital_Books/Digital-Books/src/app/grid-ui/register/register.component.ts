import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/RegisterModel';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(private _service:LoginServiceService,private _router:Router) { }
  RegisterModel:RegisterModel=new RegisterModel();
  ngOnInit(): void {
  }
  registerUser(){
    debugger;
   // this.domainArray=this.domain.split("/", 5);
    //this._router.navigate(['reader/register']);
    this._service.registerUserData(this.RegisterModel).subscribe(res=>{
      alert('Hi');
      localStorage.setItem('token',res.token);
      this._router.navigate(['reader/register']);
    },res=>console.log(res));
    
  
  }

}
