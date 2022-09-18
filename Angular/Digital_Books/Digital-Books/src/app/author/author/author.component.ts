import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorModel } from 'src/app/models/AuthorModel';
import { AuthorServiceService } from 'src/app/services/author-service.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(private http:HttpClient,private _router:Router,private _service:AuthorServiceService) { }
public isEdit:boolean=false;
public authorId:any;
public url:any="https://localhost:44330/api/Author/books";
public updateurl:any="https://localhost:44330/api/Books/bookupdate";
  ngOnInit(): void {
    this.GetAuthorByReader();
  }
  AuthorModel: AuthorModel = new AuthorModel();
  AuthorModels: Array<AuthorModel> = new Array<AuthorModel>();
  public lclEmail:any='';
  CreateBooks() {

    this.AuthorModel.referemail=localStorage.getItem('authoremailid');
    if(this.isEdit){
      this.http.put(this.updateurl,this.AuthorModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
    }else{
      this.http.post("https://localhost:44330/api/Books/create-books",this.AuthorModel).subscribe(res=>this.PostSuccess(res),res=>console.log(res));
    }
    
             
        this.AuthorModel = new AuthorModel();  

  }
  Success(input: any) {
    console.log(input);
    this.AuthorModels = input;
  }
  EditAuthor(input:any){
    this.isEdit=true;
    this.authorId=input.id;
    this.AuthorModel=input;
    this.http.put("https://localhost:44330/api/Books/bookupdate", this.authorId).subscribe(res=>this.Success(res),res=>console.log(res)); 
  }
  DeleteAuthor(inputdata:any){
    this.authorId=inputdata.id;  
    this._service.DeleteBooksDataByAuthor(this.authorId).subscribe(authorId => {
      console.log(authorId);
      this.GetAuthorByReader();
    }); 
  }
  PostSuccess(input:any){
    this.GetAuthorByReader();
  }
  GetAuthorByReader(){   
    debugger;
    this._service.GetAuthorData(this.AuthorModel).subscribe(res=>this.Success(res),res=>console.log(res));  
   }

}
