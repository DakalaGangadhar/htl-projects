import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  _readerloginUrl="https://localhost:44330/api/UserLogin/login-user";
  _authorloginUrl="https://localhost:44330/api/Author/author-login";
  
  constructor(private http:HttpClient) { }

  loginReader(login:any){
    return this.http.post<any>(this._readerloginUrl,login);
  }
  
  loginAuthor(login:any){
    return this.http.post<any>(this._authorloginUrl,login);
  }
  
}
