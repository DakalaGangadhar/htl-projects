import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderServiceService {
  public _token:any='';
  _GetAuthorByReaderSearch="https://localhost:44330/api/UserData/GetAuthorByReaderSearch/";
  _BooksDelete="https://localhost:44330/api/UserData";
  constructor(private http:HttpClient) { }


  GetAuthorByReaderSearch(_readerModel:any){
    _readerModel.category;
    _readerModel.author;
    _readerModel.publisher;
    _readerModel.price;
   
    return this.http.get<any>(this._GetAuthorByReaderSearch+'?category='+ _readerModel.category +'&author='+ _readerModel.author+'&publisher='+_readerModel.publisher+'&price='+ _readerModel.price);
   // return this.http.get<any>(this._GetAuthorByReaderSearch+'?title='+ _readerModel.title);
  }
  DeleteBooksData(id_data:any){
    return this.http.delete(this._BooksDelete+'?authorid='+id_data);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logginIn(){
    return !!localStorage.getItem('token');
  }
}
