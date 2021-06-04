import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest ,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EndvService } from './endv.service';
import { ObjectsService } from './objects.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor{

  constructor(public _EndvServices: EndvService,
              private _ObjectServices: ObjectsService ) {}

  intercept(req :HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req)
      .pipe(catchError(this.errorHandler))};
   
errorHandler (error: HttpErrorResponse)
{ console.log("HTTP interceptor")
  if (error instanceof HttpErrorResponse)
  { console.log("server side error" ,error);
    console.log("HttpErrorResponse11111",HttpErrorResponse)}
  else
  { console.log("Client side error")}
return throwError(error.message || 'Server Error') ;
} 

//    return next.handle(req).pipe(
//      
//     finalize(
//       () =>{
//          if (req.method == 'POST' || req.method == 'DELETE')
//            { this._EndvServices.showSpinner.next(true)}
//          else  
//            { this._EndvServices.showSpinner.next(false)}
//           
//           }
//     ).catchError(this.errorHandler)
//   ) 
// 
//




        
//     return next.handle(req).pipe(
//       
//       finalize(
//         () =>{
//           console.log(req)     
//           if (req.method == 'POST' || req.method == 'DELETE')
//               { this._ObjectServices._SpinnerPercentage.next(20)}
//            
//           else  
//           { this._ObjectServices._SpinnerPercentage.next(100)}
//             
//         }
//       )
//     )

//    }


 
 
 
}
