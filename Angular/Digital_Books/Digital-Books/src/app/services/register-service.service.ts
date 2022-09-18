import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  _author_registerUrl="https://localhost:44330/api/Author/author-register";
  _reader_registerUrl="https://localhost:44330/api/UserLogin/register-user";
  constructor(private http:HttpClient) { }

  
  registerAuthor(register:any){
    return this.http.post<any>(this._author_registerUrl,register);
  }
  registerReader(register:any){
    return this.http.post<any>(this._reader_registerUrl,register);
  }
}
