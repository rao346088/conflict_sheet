import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EndvLayout } from './objects';
import { Endv_url } from './constant';
import { sleep} from './Shared/delay'

@Injectable({
  providedIn: 'root'
})
export class EndvService {

  private _url: string = Endv_url
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false) 
  
  constructor(public http: HttpClient) { }
    getEndv() : Observable<EndvLayout[]> 
    {      
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
      return this.http.get<EndvLayout[]>(this._url,{headers: httpHeaders})
                      .pipe(catchError(this.errorHandler));
    }

    AddEndv(addobject : EndvLayout)
    {
      
      sleep(100);
      const httpHeaders = new HttpHeaders();
      //httpHeaders.append('content-type','application/json');
      return this.http.post<any>(this._url ,addobject , {headers: httpHeaders})
                .pipe(catchError(this.errorHandler));
    }  
    
    UpdEndv( id ,updobject : EndvLayout)
    {
   // const upd_url = 'http://localhost:3000/Endv/' + id;
   sleep(100);
   const upd_url = Endv_url + id;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.put<any>(upd_url,updobject , {headers: httpHeaders});
    }  

    DelEndv( id)
    {
        
    sleep(200);
   // const upd_url = 'http://localhost:3000/Endv/' + id;
    const upd_url = Endv_url + id;
    return this.http.delete(upd_url);
    }

    errorHandler (error: HttpErrorResponse)
     {
        return throwError(error.message || 'xxxxx sServer Error') ;
     } 
}
