import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from './customer.model';

@Component({
  selector: 'customer-root',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  title = 'angular-proj';
  CustomerModel:Customer=new Customer();
  CustomerModels:Array<Customer>=new Array<Customer>();
  public url = " http://localhost:3000/customers";
  public id_data:string='';
  constructor(private http:HttpClient ){

  }
  
  ngOnInit(): void {
    console.log("customer test");
    this.GetDataFromServer();
    }
    Success(input:any){
      this.CustomerModels=input;
    }
  Add(){
   
    // console.log('HI');
    // alert('HI');
  
    //this.CustomerModels.push(this.CustomerModel);
    //console.log(this.CustomerModels);
    //this.CustomerModel=new Customer();

    this.http.post("http://localhost:3000/customers",this.CustomerModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
    this.CustomerModel = new Customer();
  }
  GetDataFromServer(){
    this.http.get("http://localhost:3000/customers").subscribe(res=>this.Success(res),res=>console.log(res));
 
  }
  EditCustomer(input:any){
    this.id_data=input.id;
    this.CustomerModel=input;
    this.http.put("http://localhost:3000/customers", this.id_data).subscribe(res=>this.Success(res),res=>console.log(res));
   

  }
  DeleteCustomer(inputdata:any){
    this.id_data=inputdata.id;
    this.http.delete(this.url+'/'+this.id_data).subscribe(id_data => {
      console.log(id_data);
    });
  }
  PostSuccess(input:any){
    this.GetDataFromServer();
  }
}
