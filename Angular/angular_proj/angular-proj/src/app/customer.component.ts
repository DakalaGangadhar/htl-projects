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
  public url = "https://localhost:5001/api/customer";
  public id_data:string='';
  public isEdit=false;
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

    //this.http.post(this.url,this.CustomerModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
    //this.CustomerModel = new Customer();
    if(this.isEdit){
      this.http.put(this.url,this.CustomerModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
    }
    else{
      this.http.post(this.url,this.CustomerModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
    }
       
        this.CustomerModel = new Customer();
      
  }
  GetDataFromServer(){
    this.http.get(this.url).subscribe(res=>this.Success(res),res=>console.log(res));
 
  }
  EditCustomer(input:any){
    this.isEdit=true;
    this.id_data=input.id;
    this.CustomerModel=input;
    this.http.put(this.url, this.id_data).subscribe(res=>this.Success(res),res=>console.log(res));
   

  }
  DeleteCustomer(inputdata:any){
    this.id_data=inputdata.id;
    this.http.delete(this.url+'?custId='+this.id_data).subscribe(id_data => {
      console.log(id_data);
    });
  }
  PostSuccess(input:any){
    this.GetDataFromServer();
  }
}
