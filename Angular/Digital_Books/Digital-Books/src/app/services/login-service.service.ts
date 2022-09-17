import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  _loginUrl="https://localhost:44330/api/UserLogin/login-user";
  _registerUrl="https://localhost:44330/api/UserLogin/register-user";
  constructor(private http:HttpClient) { }

  loginUser(login:any){
    return this.http.post<any>(this._loginUrl,login);
  }
  registerUserData(register:any){
    return this.http.post<any>(this._registerUrl,register);
  }
}
