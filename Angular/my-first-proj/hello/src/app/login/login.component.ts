import { Component, OnInit } from '@angular/core';
import { Customer } from '../app.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
 public twbName:any;
 public isDisable:any=true;
 public color:string='red';
 public colors=["1","2","3","4"]
 public  name='Ganesha';
 public image="././assets/image.jfif"
 CustomerModel:Customer=new Customer();
 CustomerModels:Array<Customer>=new Array<Customer>();

  ngOnInit(): void {
  }
  show(val:any){
 console.log(val);
 
  }
  shows(){
    this.CustomerModels.push(this.CustomerModel);
    console.log(this.CustomerModel);
    this.CustomerModel=new Customer();
  }
  Add(){
    this.CustomerModels.push(this.CustomerModel);
    console.log(this.CustomerModel);
    this.CustomerModel=new Customer();
  }
}
