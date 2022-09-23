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

public readereditbutton:boolean=false;
public readerdeletebutton:boolean=false;
  ngOnInit(): void {
    this.GetAuthorByReader();
  }
  AuthorModel: AuthorModel = new AuthorModel();
  AuthorModels: Array<AuthorModel> = new Array<AuthorModel>();
  public lclEmail:any='';
  public activeBool:string='';
  public authorFlag:boolean=true;
  public name='';
  public selectedFile!: File;
  
  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0]
  }
  CreateBooks(event:any) {
    debugger;
    this.AuthorModel.referemail=localStorage.getItem('authoremailid');
    var _authorData = {
      title: this.AuthorModel.title,
      price: this.AuthorModel.price,
      category:  this.AuthorModel.category,
      author: this.AuthorModel.author,
      active: this.AuthorModel.active,
      contentdata: this.AuthorModel.contentdata,
      publisher: this.AuthorModel.publisher,
      referemail: this.AuthorModel.referemail
    };   
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    uploadData.append('Title', _authorData.title);
    uploadData.append('Price', _authorData.price);
    uploadData.append('Category', _authorData.category);
    uploadData.append('Author', _authorData.author);
    uploadData.append('Active', _authorData.active);
    uploadData.append('Contentdata', _authorData.contentdata);
    uploadData.append('Publisher', _authorData.publisher);
    uploadData.append('Referemail', _authorData.referemail);


    
    if(this.isEdit){
      this.activeBool= String(this.AuthorModel.active);
      this.AuthorModel.active=this.activeBool;
      this.http.put(this.updateurl,_authorData).subscribe(res=>this.PostSuccess(res),res=>console.log(res))
    }else{
      this.http.post("https://localhost:44330/api/Books/create-books",uploadData).subscribe(res=>this.PostSuccess(res),res=>console.log(res));
    }
    
             
        this.AuthorModel = new AuthorModel();  
        this.authorFlag=false;

  }
  Success(input: any) {
    console.log(input);
    this.AuthorModels = input;
    for(var i=0;i<this.AuthorModels.length;i++){
      console.log()
    }
  }
  public activeFlag:any='';
  EditAuthor(input:any){
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    this.authorFlag=true;
    this.isEdit=true;
    this.authorId=input.id;
    this.activeFlag=String(input.active);
    this.AuthorModel.image=uploadData;
    this.AuthorModel.active=this.activeFlag;
    this.AuthorModel=input;
    //this.http.put("https://localhost:44330/api/Books/bookupdate", this.authorId).subscribe(res=>this.Success(res),res=>console.log(res)); 
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
    this.AuthorModel.referemail=localStorage.getItem('authoremailid');
    this._service.GetAuthorData(this.AuthorModel).subscribe(res=>this.Success(res),res=>console.log(res));  
   }
   dirAddBookspage(){
    this.authorFlag=true;
   }
   dirCreateBooksdiv(){
    this.authorFlag=false;
   }
   BlockGrid(inputdata:any){
    this.authorId=inputdata.id;  
    this._service.BlockGridService(this.authorId);
      this.GetAuthorByReader();
   
  }
  UnBlockGrid(inputdata:any){
    this.authorId=inputdata.id;  
    this._service.UnBlockGridService(this.authorId);
      this.GetAuthorByReader();    
  }
   hasError(typeofValidator:string,controlname:string):Boolean{
    
    return this.AuthorModel.formAuthorGroup.controls[controlname].hasError(typeofValidator);
  }

}
