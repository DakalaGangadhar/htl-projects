import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReaderModel } from 'src/app/models/ReaderModel';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ReaderServiceService } from 'src/app/services/reader-service.service';

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
  constructor(private http:HttpClient,private _router:Router,private _service:ReaderServiceService) { }

  ngOnInit(): void {
    this.SearchAuthorByReader();
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
  
  SearchAuthorByReader(){   
   this._service.GetAuthorByReaderSearch(this.ReaderModel).subscribe(res=>this.Success(res),res=>console.log(res));  
  }
  
  EditReader(input:any){
    this.isEdit=true;
    this.id_data=input.id;
    this.ReaderModel=input;
    this.http.put(this.url, this.id_data).subscribe(res=>this.Success(res),res=>console.log(res)); 
  }
  DeleteAuthor(inputdata:any){
    this.id_data=inputdata.id;  
    this._service.DeleteBooksData(this.id_data).subscribe(id_data => {
      console.log(id_data);
      this.SearchAuthorByReader();
    }); 
  }
  PostSuccess(input:any){
    this.SearchAuthorByReader();
  }
  Success(input: any) {
    console.log(input);
    this.ReaderModels = input;
  }
  readerLogin(){
    this._router.navigate(['reader/add']);
  }

}
