import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthorServiceService {

  _GetAuthorByReaderSearch="https://localhost:44330/api/Books/getbooksdata";
  _BooksDelete="https://localhost:44330/api/Books/book-delete";
  public url:any='https://localhost:44330/api/Books/author-create-book';
  public block:any='https://localhost:44330/api/Books/book-block';
  public unblock:any='https://localhost:44330/api/Books/book-unblock';

  
  constructor(private http:HttpClient) { }

CreateBooks(){
  return this.http.post<any>(this.url,"");
}
  GetAuthorData(_readerModel:any){
  
    //return this.http.get<any>(this._GetAuthorByReaderSearch+'?title='+ _readerModel.title +'&&author='+ _readerModel.author+'&&publisher='+_readerModel.publisher+'&&releasedate='+ _readerModel.releasedate);
    return this.http.get<any>(this._GetAuthorByReaderSearch+'?auhtoremail='+_readerModel.referemail);
  }
  DeleteBooksDataByAuthor(id_data:any){
    return this.http.delete(this._BooksDelete+'?authorid='+id_data);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logginIn(){
    return !!localStorage.getItem('token');
  }
  BlockGridService(id:any){
    this.http.put(this.block, id).subscribe(res=>this.BlockUnBlock(res),res=>console.log(res))

  }
  UnBlockGridService(id:any){
    this.http.put(this.unblock, id).subscribe(res=>this.BlockUnBlock(res),res=>console.log(res))
  }
  BlockUnBlock(input:any){
    console.log(input);

  }
  
}
