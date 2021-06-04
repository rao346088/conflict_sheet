import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionDataLayout } from './objects';

@Injectable({
  providedIn: 'root'
})
export class ActionDataService {


  private _Url = "http://localhost:5000/api/action"
  constructor(private http:HttpClient) { }

  postActionData(user:any){
    console.log("test 4")
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.post<any>(this._Url ,user , {headers: httpHeaders});
    
  }

  getActionData() : Observable<ActionDataLayout[]> 
  {      
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.get<ActionDataLayout[]>(this._Url,{headers: httpHeaders})
                  
  }
}
