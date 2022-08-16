import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IObject, MLLayout } from './objects';
import { MLK } from './constant';



@Injectable({
  providedIn: 'root'
})
export class MasterLookupService {

   private _url: string ="https://conflictserver.azurewebsites.net/MasterLookup"
 //   private _url : string =MLK 
  constructor(private http: HttpClient) { }

  
    getMLO() : Observable<MLLayout[]> 
    {
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
      return this.http.get<MLLayout[]>(this._url,{headers: httpHeaders})
                      .pipe(catchError(this.errorHandler));
    }

    
    AddMLO(addobject : MLLayout)
    {
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
      return this.http.post<any>(this._url ,addobject , {headers: httpHeaders});
    }  
    
    UpdMLO( id ,updobject : MLLayout)
    {
    const upd_url = 'https://conflictserver.azurewebsites.net/MasterLookup/' + id;
   // const upd_url = MLK + id;
    console.log(id)
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.put<any>(upd_url,updobject , {headers: httpHeaders});
    }  

    DelMLO( id)
    {
     const upd_url = MLK + id;
    //const httpHeaders = new HttpHeaders();
    //httpHeaders.append('content-type','application/json');
    return this.http.delete(upd_url);
    }



    errorHandler (error: HttpErrorResponse)
     {
       return throwError(error.message || 'Server Error') ;
     } 
}


