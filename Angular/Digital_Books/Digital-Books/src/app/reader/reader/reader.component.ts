import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReaderModel } from 'src/app/models/ReaderModel';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  ReaderModel:ReaderModel=new ReaderModel();
  ReaderModels:Array<ReaderModel>=new Array<ReaderModel>();
  public url = "https://localhost:44330/api/UserData";
  public id_data:string='';
  public isEdit=false;
  constructor(private http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
    this.GetDataFromServer();
  }
  Add(){   
    
    if(this.isEdit){
      this.http.put(this.url,this.ReaderModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
    }
    else{
      this.http.post(this.url,this.ReaderModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
    }
       
        this.ReaderModel = new ReaderModel();
      
  }
  
  GetDataFromServer(){
    this.ReaderModel;
    this.http.get(this.url).subscribe(res=>this.Success(res),res=>console.log(res));
 
  }
  EditCustomer(input:any){
    this.isEdit=true;
    this.id_data=input.id;
    this.ReaderModel=input;
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
  Success(input:any){
    this.ReaderModel=input;
  }
  readerLogin(){
    this._router.navigate(['reader/add']);
  }

}
