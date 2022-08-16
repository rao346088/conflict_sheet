import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPackage }from './package';
import { noop, Observable, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { sleep } from './Shared/delay';
import { MLK } from './constant';

import { IObject } from './objects';
@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private _url:string = "https://conflictserver.azurewebsites.net/package";
  
  package: any[];
  

  constructor(private http:HttpClient ) { }
  
  AddElement(userData: any) {
    return this.http.post<any>(this._url, userData);
  }

    getPackages() : Observable<IPackage[]>
    {
       const httpHeaders = new HttpHeaders();
       httpHeaders.append('content-type','application/json');
        return this.http.get<IPackage[]>(this._url,{headers: httpHeaders})
                        .pipe(catchError(this.errorHandler));
    } 
    
    AddPackages(addobject : IPackage)
    {
      sleep(100);
      console.log("addobject", addobject);
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
      return this.http.post<any>(this._url ,addobject , {headers: httpHeaders});
    }  
     
    
   UpdPackage({ id, updobject }: { id: any; updobject: IPackage; })
    {
     sleep(100);
    const upd_url = 'https://conflictserver.azurewebsites.net/package/' + id;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.put<any>(upd_url,updobject , {headers: httpHeaders})
               .pipe(catchError(this.errorHandler));
    }  

    DelPackage( id:any)
    {
      //console.log("test2");
      sleep(100);
    const upd_url = 'https://conflictserver.azurewebsites.net/package/' + id;
   // const httpHeaders = new HttpHeaders();
    //httpHeaders.append('content-type','application/json');
    return this.http.delete(upd_url);
    }
    
  errorHandler (error: HttpErrorResponse)
  {
      return throwError(error.message || 'xxxxx sServer Error') ;
  }
}