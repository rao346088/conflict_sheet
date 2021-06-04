import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import { IObject} from './objects';
import { Obj_url } from './constant';
import { sleep} from './Shared/delay'
import { Subject } from 'rxjs';
import { ActionDataService } from './action-data.service';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

 //   private _Good_Rec_Cnt = new Subject<Number | null>();
      private _Good_Rec_Cnt = new Subject();
    _Good_Rec_Cnt$ = this._Good_Rec_Cnt.asObservable(); 

    public Objdata = [];
    public MaxId = 0;
    private _url = Obj_url;
   // public Endvdata = [];
   // public MissingInEndevor = "No";
    public maximum_object = 1000;
    //public conflict = "No"
    public errorMsg = " ";
    public FORM_DATA = [];
    public Control_Total = [];
    public ObjAddComplete = false;
  public actiondata:any
  public dt = new Date();
  public dt1 = this.dt.toLocaleString();
  public MaxActionId;
    
  constructor(private http: HttpClient,
              //public _EndvServices: EndvService
              public _actionData:ActionDataService,
              private _auth:AuthService
              ) { }

    getObjects() : Observable<IObject[]> 
    {
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
    //httpHeaders.append('content-type','IObject');
      return this.http.get<IObject[]>(this._url,{headers: httpHeaders})
     //                 .pipe(catchError(this.errorHandler));
    }

    
    Addelement(addobject : IObject)
    { 
      sleep(100)
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('content-type','application/json');
      return this.http.post<any>(this._url ,addobject , {headers: httpHeaders});
   //                      .pipe(catchError(this.errorHandler));
    }  
    
   Updelement( id ,updobject : IObject)
    {
     sleep(100)
    const upd_url = 'http://localhost:5000/Objects/' + id;
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    return this.http.put<any>(upd_url,updobject , {headers: httpHeaders})
    //        .pipe(catchError(this.errorHandler));
    }  

    Delelement( id)
    {
      sleep(200);
    const upd_url = 'http://localhost:5000/Objects/' + id;
    //const httpHeaders = new HttpHeaders();
    //httpHeaders.append('content-type','application/json');
    return this.http.delete(upd_url);
    }

    errorHandler (error: HttpErrorResponse)
    {
      return throwError(error.message || 'Server Error') ;
    } 

 ProcessAddObj(CSVData){
  this._auth.getUser();
  this.FORM_DATA = CSVData
  this.Control_Total =[]
  this.Control_Total[0] = []
  this.Control_Total[0].Total_Rec_Cnt = 0
  this.Control_Total[0].Good_Rec_Cnt = 0
  this.Control_Total[0].Bad_Rec_Cnt = 0
  this.Control_Total[0].Per_Completion = 20
  this._Good_Rec_Cnt.next(this.Control_Total[0])
  
   let resp = this.getObjects()
   .subscribe(data =>
     {
       this.Objdata=data;
       this.GetMaxID();
       this.AddObj() ;
       //this.GetConflict();
      // this.GetEndvData();
       
      },
      Error =>{this.errorMsg = Error;
               });
               

 }

 /*--------------------------------------Get Maxid  ----------------------------------*/
  GetMaxID()
  { this.MaxId = 0
    this.Control_Total[0].Per_Completion = 40
    this._Good_Rec_Cnt.next(this.Control_Total[0])
   
    for(let i = 0; i < this.Objdata.length;i++)
      {
        if (this.MaxId < this.Objdata[i].id)
        {/*---- Loop to maximum id */
          this.MaxId = this.Objdata[i].id

        }/*---- End- Loop to maximum id */
      }   
    //  console.log("test6",this.MaxId )
  }
/*--------------------------------------End of Get Maxid  ----------------------------------*/

/*--------------------------------------Get Endevor data  ----------------------------------*/            
 /*GetEndvData(){
  this.Control_Total[0].Per_Completion = 60
  this._Good_Rec_Cnt.next(this.Control_Total[0])
  
   let resp2 =  this._EndvServices.getEndv();
   this._EndvServices.getEndv()
   resp2.subscribe(data =>{
                   (<EndvLayout[]>this.Endvdata) = data;
                    this.GetMissingInEndevor()
                           });
   
 }*/
/*--------------------------------------Get Endevor data  ----------------------------------*/ 

/*GetConflict()
{
  
  // console.log("GetConflict()",this.FORM_DATA,this.Objdata)
  for(let i = 0; i < this.FORM_DATA.length ;i++)
  { console.log("test conflit",this.FORM_DATA[i]); 
    this.FORM_DATA[i].Conflict= "No" 
      
      this.Control_Total[0].Total_Rec_Cnt = this.Control_Total[0].Total_Rec_Cnt + 1
      for(let j = 0; j < this.Objdata.length ;j++)
    { 
       if (this.Objdata[j].MemberName==this.FORM_DATA[i].MemberName && 
       this.Objdata[j].Type == this.FORM_DATA[i].Type)
       {
         this.FORM_DATA[i].Conflict= "Yes" 

         break;
       }  
    }
  }
 }*/
/*--------------------------------------Get MissingInEndevor----------------------------------*/
/*GetMissingInEndevor()
{
   this.Control_Total[0].Per_Completion = 80
   this._Good_Rec_Cnt.next(this.Control_Total[0])

  let NonEndvObj = new Set (["SCREEN","PROCEDURE","EAB"]);
  for(let i = 0; i < this.FORM_DATA.length && i < this.maximum_object ;i++)
  {
    if (NonEndvObj.has(this.FORM_DATA[i].Type))
      {this.FORM_DATA[i].MissingInEndevor ="N/A"}
    else    
    { if(this.FORM_DATA[i].MemberName=="DCSS348B"){
      console.log("Form data",this.FORM_DATA[i].MemberName,this.FORM_DATA[i].Type)
    }

      this.FORM_DATA[i].MissingInEndevor =  "Yes"
      for (let k=0 ;k < this.Endvdata.length && k < this.maximum_object ;k++)
       {
        if(this.FORM_DATA[i].MemberName=="DCSS348B"){
          console.log("Endevor data",this.Endvdata[k].MemberName,this.Endvdata[k].Type)
          }

        if (this.FORM_DATA[i].MemberName == this.Endvdata[k].MemberName && 
        this.FORM_DATA[i].Type == this.Endvdata[k].Type)
          { this.FORM_DATA[i].MissingInEndevor =  "No"
            break
           }
           
          
       }  /* Endloop endevor objects*/
     //} /* Else non endevor objects */
    /*  
  } Endloop  file objects 
 
}  End of missing check 
*/
/*--------------------------------------End of Get MissingInEndevor----------------------------------*/
/*--------------------------------------Addobj----------------------------------*/
AddObj(){
  this._auth.getUser();
 console.log('this._auth.currentemail',this._auth.currentemail)
  for(let i = 0; i < this.FORM_DATA.length;i++)
     { 
       // console.log("this.MaxId ",this.MaxId )
        this.FORM_DATA[i].id = this.MaxId + i +1
        const newformdata = { 
          id                  : this.FORM_DATA[i].id 				
        , MemberName          : this.FORM_DATA[i].MemberName      
        , GenName             : this.FORM_DATA[i].GenName         
        , Type                : this.FORM_DATA[i].Type            
        , Project_Name        : this.FORM_DATA[i].Project_Name    
        , Release             : this.FORM_DATA[i].Release         
        , Change_Type         : this.FORM_DATA[i].Change_Type     
        , Developer           : this.FORM_DATA[i].Developer       
        , CCID                : this.FORM_DATA[i].CCID            
        //, Conflict            : this.FORM_DATA[i].Conflict        
        //, MissingInEndevor    : this.FORM_DATA[i].MissingInEndevor
        ,Action:"Post"
         ,Created_by: this._auth.currentemail
        ,Created_on: this.dt1
        ,Updated_by: this._auth.currentemail
        ,Updated_on: this.dt1
      }
                  
           
       this.Addelement(newformdata)
        .subscribe(data => { console.log(' Add Success!');

        });

     
     

    
      

          /*                  this.Control_Total[0].Per_Completion = (i/(this.Control_Total[0].Total_Rec_Cnt * 5)) * 100 + 80
                            this._Good_Rec_Cnt.next(this.Control_Total[0])
                            
                            this.ObjAddComplete = true;
                            this.Control_Total[0].Good_Rec_Cnt = this.Control_Total[0].Good_Rec_Cnt + 1;
                          },
                   Error=> {console.log("Addservice error",Error)
                            this.errorMsg=Error 
                             this.Control_Total[0].Bad_Rec_Cnt = this.Control_Total[0].Bad_Rec_Cnt + 1;
                            }  );
                 }       
                 console.log("this.Control_Total",this.Control_Total[0]) */
}
/*--------------------------------------Addobj----------------------------------*/
 /* maxId(){
    this.MaxActionId = 0
   
    for(let i = 0; i < this.actiondata.length;i++)
      {
        if (this.MaxActionId < this.actiondata[i].id)
        {
          this.MaxActionId = this.actiondata[i].id

        }
      } */  
     
  }        
}

