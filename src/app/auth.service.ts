import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { UserLayout } from './objects';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   public currentUser:any
   private _regUrl = "https://conflictserver.azurewebsites.net/register"
   private _logUrl = "https://conflictserver.azurewebsites.net/login"
  currentemail: String;
  constructor(private http:HttpClient, private _router:Router) { }

  registerUser(user:any){
    //console.log("test3")
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.post<any>(this._regUrl ,user , {headers: httpHeaders});
  }

  loginUser(user:any){
    console.log("test 4")
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.post<any>(this._logUrl ,user , {headers: httpHeaders});
    
  }
  ReadUser() : Observable<any> 
  {      
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.get<UserLayout[]>(this._logUrl,{headers: httpHeaders})
                   // .pipe(catchError(this.errorHandler));
  }

 getUser(){
   console.log("getUser")

  this.ReadUser()
  .subscribe(data => {
    let login2data=data;
    console.log("login2data",login2data)
    console.log("Role",login2data.log1Data.Role)
   this.currentUser= login2data.log1Data.Role;
   this.currentemail= login2data.log1Data.email;
      })
  return this.currentUser, this.currentemail

  } 
 
  logoutUser() {
    localStorage.removeItem('token')
    this.currentUser= ' '
    this.getUser();
    console.log("Logout currentUser ",this.currentUser)
    this._router.navigate(['/login'])

  }

  getToken() {
    return localStorage.getItem('token')
  } 

  loggedIn() {
    return !!localStorage.getItem('token')    
    
  }
}

