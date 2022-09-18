import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  _readerloginUrl="https://localhost:44330/api/UserLogin/login-user";
  _authorloginUrl="https://localhost:44330/api/Author/author-login";
  
  constructor(private http:HttpClient,private _router:Router) { }

  loginReader(login:any){
    return this.http.post<any>(this._readerloginUrl,login);
  }
  
  loginAuthor(login:any){
    return this.http.post<any>(this._authorloginUrl,login);
  }
  logginIn(){
    return !!localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['']);
  }
  
}
