import { Component, OnInit ,AfterViewInit,ViewChild } from '@angular/core';
import { FormGroup,Validators ,FormBuilder } from '@angular/forms';
import { EndvLayout,OBJCSVLayout} from '../objects';
import { PstepNameValidator} from '../Shared/PstepName.validator';
import { GenNameValidator} from '../Shared/GenName.validator';
import { LookupReadComponent } from '../lookup-read/lookup-read.component'
import { EndvService } from '../endv.service';
import { ObjectsService } from '../objects.service';
import { maximum_object } from '../constant'
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { NgxSpinnerService } from "ngx-spinner";
import { ActionDataService } from '../action-data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-object-form',
  templateUrl: './object-form.component.html',
  styleUrls: ['./object-form.component.css']
})
export class ObjectFormComponent implements  OnInit , AfterViewInit {
  public duplicate = false;
  public MissingInEndevor ="No"
  public Loadid = 0 ;
  public MaxId = 0;
  public FileuploadChecked = false;
  public Endvdata = [];
  public Objdata = [];
  public CSVData =[];
  public DataForObjAdd= [];
  public ErrorMsg;
  public ErrorMsg1;
  public LType =[];
  public LoadData = [];
  public counts = [];
  public conflict ="No"
  public SpinnerPercentage = 0.00
  public Loaddatahaserror = false;
  public TypeHasError = false;
  public PNHasError = false
  public Childtest : String = "Child test data"
  public RelHasError = false
  header: boolean = false;
  csvRecords: OBJCSVLayout[] ;
  public ChangeTypeHasError = false;
  public DeveloperHasError =false
  public CCIDHasError = false
  public actiondata;
  public logindata
 /*-----------------form content------------------------------*/

 get MemberName() 
 {
    return this.ConflictsheetForm.get('MemberName');
 }

  get GenName()
 {
    return this.ConflictsheetForm.get('GenName');
 }

  get Type() {
    return this.ConflictsheetForm.get('Type');
 }
  
 
 validateType(value)
 {

 if (value == 'default') 
   {
     this.TypeHasError = true;
   }else 
   {
    this.TypeHasError  = false;
   }
   console.log("TypeHasError",this.TypeHasError)
 }

 get Change_Type() {
    return this.ConflictsheetForm.get('Change_Type');
}
validateChangeType(value)
{
  
if (value === 'default') 
  {
    this.ChangeTypeHasError = true;
  }else 
  {
   this.ChangeTypeHasError  = false;
  }
  
}

 get Project_Name() {
  return this.ConflictsheetForm.get('Project_Name');
}
validateProjectName(value)
{
if (value == 'default') 
  {
    this.PNHasError = true;
    
  }else 
  {
   this.PNHasError  = false;
  }
  
}

get Release() {
  return this.ConflictsheetForm.get('Release');
}
validateRelease(value)
{
if (value == 'default') 
  {
    this.RelHasError = true;
  }else 
  {
   this.RelHasError  = false;
  }
  console.log("TypeHasError",this.TypeHasError)
}

get Developer() {
  return this.ConflictsheetForm.get('Developer');
}
validateDeveloper(value)
{
if (value == 'default') 
  {
    this.DeveloperHasError = true;
  }else 
  {
   this.DeveloperHasError  = false;
  }
  
}

get CCID() {
  return this.ConflictsheetForm.get('CCID');
}
validateCCID(value)
{
if (value == 'default') 
  {
    this.CCIDHasError = true;
  }else 
  {
   this.CCIDHasError  = false;
  }
  
}

get Input_file() {
  return this.ConflictsheetForm.get('Input_file');
}

get FileUpload() {
  return this.ConflictsheetForm.get('FileUpload');
}
 
ConflictsheetForm: FormGroup;
submitted = false;
 
  constructor(private fb: FormBuilder,
              private ngxCsvParser: NgxCsvParser,
              private _ObjectServices: ObjectsService,
              private spinner: NgxSpinnerService,
              public _EndvServices: EndvService,
              private _actionData:ActionDataService,
              public _auth:AuthService
              ) { }

 @ViewChild(LookupReadComponent) LookupReadref : LookupReadComponent;

  ngAfterViewInit() {
        
  }
               
  ngOnInit(): void {
    this._auth.getUser()
    console.log("tobjectform tngonit");
 /*-----------------------NGX spinner ------------------------------------------------------*/
  /** spinner starts on init */
   this.spinner.hide();
 
 //  setTimeout(() => {
 //   /** spinner ends after 5 seconds */
 // //  this.spinner.hide();
 //  }, 5000);
  /*-----------------------------------------------------------------------------------------*/ 

  /*-----------------Form content validation------------------------------*/
  this.ConflictsheetForm = this.fb.group({
    MemberName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(8) ]],
    GenName: [''],
    Type: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
    Change_Type: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
    FileUpload :[''],
    Input_file: [''],    
    Project_Name: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
    Release: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(30)]],
    Developer: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
    CCID: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]]
    },{validators:[ GenNameValidator,PstepNameValidator]});
  
  /*---------------------------------------File upload --------------------------------------------------------*/

 this.ConflictsheetForm.get('FileUpload').valueChanges
 .subscribe(Value => {
  const Input_file = this.ConflictsheetForm.get('Input_file');
  const FileUpload = this.ConflictsheetForm.get('FileUpload')
  const MemberName = this.ConflictsheetForm.get('MemberName');
  const GenName = this.ConflictsheetForm.get('GenName');
  const Change_Type = this.ConflictsheetForm.get('Change_Type');
  const Type = this.ConflictsheetForm.get('Type');
      if (Value) 
      {MemberName.clearValidators();
       Change_Type.clearValidators();
       Type.clearValidators();

       Input_file.setValidators(Validators.required);
      } else 
      { this.csvRecords = [];
        MemberName.setValidators([Validators.required,Validators.minLength(3),Validators.maxLength(8) ]);  
        Type.setValidators([ Validators.required,Validators.minLength(3),Validators.maxLength(8)]);   
        Change_Type.setValidators([Validators.required,Validators.required, Validators.minLength(3),Validators.maxLength(20)]);
        Input_file.clearValidators();
      }
      MemberName.updateValueAndValidity({emitEvent: false});
      Change_Type.updateValueAndValidity({emitEvent: false});
      Type.updateValueAndValidity({emitEvent: false});
      Input_file.updateValueAndValidity({emitEvent: false});
      FileUpload.updateValueAndValidity({emitEvent: false})
   });
   
 /*--------------------------------------Get Endevor data  ----------------------------------*/
 let resp2 =  this._EndvServices.getEndv();
 this._EndvServices.getEndv()
 resp2.subscribe(data =>(<EndvLayout[]>this.Endvdata) = data
 );

 /*-----------------Object data content ------------------------------*/
   let resp3 = this._ObjectServices.getObjects();
   this._ObjectServices.getObjects()
       resp3.subscribe(data =>this.Objdata = data,
                Error =>{this.ErrorMsg = Error;
           });

/* Object service status *---------------------------------------------*/
  this._ObjectServices._Good_Rec_Cnt$.subscribe(
  message => { if (Object.keys(message).length!==0)
   {// console.log("Object.keys(message).length",Object.keys(message).length,this.counts[0])
     this.counts[0] = message
    this.SpinnerPercentage = this.counts[0].Per_Completion
   } 
  }
);
  
  } /*--End of ngonit -------*/
  
/*----------------------------load form data----------------------------*/
  Loadform(a ,b,c,d,e,f,g,h,i){
    this.Loadid = a;
    this.ConflictsheetForm.patchValue({
      MemberName : b,
      GenName : c,
      Type : d,
      Project_Name : e,
      Release : f,
      Change_Type : g,
      Developer : h,
      CCID : i
    });
  } 
 
   /*-----------------Submit button------------------------------*/ 
  onSubmit()
  { this.spinner.show(); 
    if (this.FileuploadChecked == true) 
       { 
         this.AddObjectList()
      }
    else
      { 
      this.CSVData[0] = []
      this.CSVData[0].MemberName = this.ConflictsheetForm.value.MemberName.trim().toUpperCase()
      this.CSVData[0].GenName = this.ConflictsheetForm.value.GenName.trim().toUpperCase()
      this.CSVData[0].Type = this.ConflictsheetForm.value.Type.trim().toUpperCase()
      this.CSVData[0].Change_Type = this.ConflictsheetForm.value.Change_Type.trim().toUpperCase()
      this.CSVData[0].Project_Name = this.ConflictsheetForm.value.Project_Name.trim().toUpperCase()
      this.CSVData[0].Release = this.ConflictsheetForm.value.Release.trim().toUpperCase()
      this.CSVData[0].Developer = this.ConflictsheetForm.value.Developer.trim().toUpperCase()
      this.CSVData[0].CCID = this.ConflictsheetForm.value.CCID.trim().toUpperCase()
      
      this.CSVData[0].Conflict= " " 
      this.CSVData[0].MissingInEndevor=""
      this.CSVData[0].id = 0
      this.DupCheck()
        
        if (this.duplicate == false)
        { this._ObjectServices.ProcessAddObj(this.CSVData)
         
        } 
     
        else
        {
          this.spinner.hide();
            this.ConflictsheetForm.patchValue(
            {
            MemberName : this.ConflictsheetForm.value.MemberName,
            GenName : this.ConflictsheetForm.value.GenName,
            Type : this.ConflictsheetForm.value.Type,
            Project_Name : this.ConflictsheetForm.value.Project_Name,
            Release : this.ConflictsheetForm.value.Release,
            Change_Type : this.ConflictsheetForm.value.Change_Type,
            Developer : this.ConflictsheetForm.value.Developer,
            CCID : this.ConflictsheetForm.value.CCID
            });
         } /*---- End-If Dupliate*/
                  
       } /* End not a file upload */
     

  }  /* End of onsubmit */


AddObjectList()
{  
  for(let i = 0; ( i < this.csvRecords.length  && i < maximum_object ); i++ )  
  { 
    this.CSVData[i] = []
    this.CSVData[i].MemberName = this.csvRecords[i].MemberName.trim().toUpperCase()
    this.CSVData[i].GenName = this.csvRecords[i].GenName.trim().toUpperCase()
    this.CSVData[i].Type = this.csvRecords[i].Type.trim().toUpperCase()
    this.CSVData[i].Change_Type = this.csvRecords[i].Change_Type.trim().toUpperCase()
    this.CSVData[i].Project_Name = this.ConflictsheetForm.value.Project_Name.trim().toUpperCase()
    this.CSVData[i].Release = this.ConflictsheetForm.value.Release.trim().toUpperCase()
    this.CSVData[i].Developer = this.ConflictsheetForm.value.Developer.trim().toUpperCase()
    this.CSVData[i].CCID = this.ConflictsheetForm.value.CCID.trim().toUpperCase()
    
    this.CSVData[i].Conflict= " " 
    this.CSVData[i].MissingInEndevor="" 
       
  }

  this._ObjectServices.ProcessAddObj(this.CSVData)

}

/*-------------------------------------------End of Object ADD ---------------------------------*/

/*-------------------------------------------Process File upload ---------------------------------*/
@ViewChild('fileImportInput') fileImportInput: any;

fileChangeListener($event: any)
{ this.csvRecords = [];
  const files = $event.srcElement.files;;
  this.header = true
     this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => 
    {
     /* Success -------------------------------*/ 
        this.csvRecords=  result;
        this.ProcessFile()
             
    /* Failure -------------------------------*/         
         
  }, (error: NgxCSVParserError) => {
    
  });

} 

FileDupcheck(){
  if (this.csvRecords)
  {this.ProcessFile()

  }
}

ProcessFile(){
  let i = 0
  if (this.csvRecords.length > 0)
  {
    this.ConflictsheetForm.controls['Input_file'].setErrors(null);
  }
  for(i; ( i < (<any>this.csvRecords).length  && i < maximum_object ); i++ )  
  {
   
  this.CSVData[0] = []
  this.CSVData[0] = this.csvRecords[i]
  this.CSVData[0].Project_Name = this.ConflictsheetForm.value.Project_Name
  this.ErrorMsg1 = " "
  this.ErrorMsg = " "
  this.ValidateFileload(i)
  
  this.csvRecords[i].ErrorMsg = this.ErrorMsg1
  if ( this.ErrorMsg1 > " " )
     { this.csvRecords[i].Status = true 
       this.ConflictsheetForm.controls['Input_file'].setErrors({'invalid': true}); }
  else   
     { this.csvRecords[i].Status = false }
   }
}

ValidateFileload(i){
  
  this.TypeCheck()
  this.MemNameCheck()
  this.GenNameCheck()
  this.ChgTypeCheck()
  this.formDupckeck()
  this.DupCheck()
  this.SelfDupCheck(i)
  
}
formDupckeck(){
  console.log("test2",this.MemberName.pristine )
  if ( !this.MemberName.pristine  && !this.Type.pristine && !this.Project_Name.pristine)
  {
    console.log("test3")
    this.CSVData[0] = []
    this.CSVData[0].MemberName = this.ConflictsheetForm.value.MemberName.trim().toUpperCase()
    this.CSVData[0].Type = this.ConflictsheetForm.value.Type.trim().toUpperCase()
    this.CSVData[0].Project_Name = this.ConflictsheetForm.value.Project_Name.trim().toUpperCase()
    this.DupCheck()
  }
}

/*-------------------------------------------Duplicate Check ---------------------------------*/
DupCheck()
{ this.duplicate = false
  for(let i = 0; i < this.Objdata.length;i++)
  { console.log("test5",this.duplicate)
    if( this.Objdata[i].MemberName == this.CSVData[0].MemberName.toUpperCase() && 
        this.Objdata[i].Type == this.CSVData[0].Type.toUpperCase()  &&
        this.Objdata[i].Project_Name == this.CSVData[0].Project_Name.toUpperCase() )
      {  
        if (this.duplicate == false)
           {this.duplicate = true;}
           this.ErrorMsg = "Duplicate element"
           this.PopulateError()
           console.log("test6",this.duplicate) 
           break;
      }
    
  } 
}
/*-------------------------------------------End of Duplicate Check ---------------------------------*/
/*-------------------------------------------Self Duplicate Check ---------------------------------*/
SelfDupCheck(i)
{for(let m = 0; m < this.csvRecords.length - 1;m++)
  { if (i!==m)
    {
      if( this.csvRecords[m].MemberName == this.CSVData[0].MemberName && 
          this.csvRecords[m].Type == this.CSVData[0].Type  &&
          
          this.duplicate == false)
      { 
          this.duplicate = true;
          this.ErrorMsg = "Duplicate element"
          this.PopulateError()
      }
    }
  } 

}

PopulateError()
{
  if (this.ErrorMsg1 > " " )
  { this.ErrorMsg1 = this.ErrorMsg1 + ';' + this.ErrorMsg
 
  }
  else
  { this.ErrorMsg1 = this.ErrorMsg
 
  }
    this.ErrorMsg = " "
}

GenNameCheck(){

  let GenType = new Set ([ "CGABB" , "CGABO" , "CGPRADO" , "CGPRADB" ]);
  if  (GenType.has(this.CSVData[0].Type.toUpperCase() ) )
  {   
      switch(true ) 
      { 
        case this.CSVData[0].GenName.length == 0 :
          {   
              this.ErrorMsg = "GenName required"
              this.PopulateError()
              break;                   
          }
        case this.CSVData[0].GenName.length < 10 :
          {  
            this.ErrorMsg="GenName minimum required length 10 byte"
            this.PopulateError()
            break;  
          }  
        case this.CSVData[0].GenName.length > 35 :
          {  
            this.ErrorMsg="GenName Maximum allowed length 10 byte"
            this.PopulateError()
            break;  
          } 
         default:  {  
                   }
      } 
      
  } 
  
}

MemNameCheck(){

  switch(true)
  {
    case this.CSVData[0].Type.toUpperCase() == "JCL" :
    { if ( this.CSVData[0].MemberName.toUpperCase().startsWith("DCSS")==false)
        {// console.log("test12",this.CSVData[0].MemberName.toUpperCase(),this.CSVData[0].Type.toUpperCase())
          this.ErrorMsg= "JCL not starting with DCSS"
          this.PopulateError()
          
        }
        break;
    }

    case this.CSVData[0].Type.toUpperCase() == "CGPRADO" :
     {   if ( this.CSVData[0].MemberName.toUpperCase().endsWith("PR")==false)
        { this.ErrorMsg= "Pstep not ending with PR"
          this.PopulateError()
        }
        break;
    }  
    case this.CSVData[0].MemberName.length == 0:
      {
        this.ErrorMsg = "MemberName required";
        this.PopulateError();
        break;
      }
    case this.CSVData[0].MemberName.length < 3 : 
    {
       this.ErrorMsg = "MemberName requires minimum 3 letters"
       this.PopulateError();
       break;
    }
    case this.CSVData[0].MemberName.length > 8 :  
     {
       this.ErrorMsg = "MemberName allowed maximum 8 letters"
        this.PopulateError();
        break;
     }  
    default:  { return null}
    
  }
}

ChgTypeCheck(){
  if (this.LookupReadref.LChange_Type.includes(this.CSVData[0].Change_Type.toUpperCase()))
      {  }
   else
    {
      this.ErrorMsg= "Change type is incorrect"
      this.PopulateError()
    }
}

TypeCheck(){
   if (this.LookupReadref.LType.includes(this.CSVData[0].Type.toUpperCase()))
      { 
      }
   else 
    {
      this.ErrorMsg =  "Type is incorrect"
      this.PopulateError()
    }

}
/*-----Update element --------------------------------------------------------------*/
  
 Updelement(id) {
    this.spinner.show();
   const newformdata = { 
    id :  this.Loadid ,
     MemberName : this.ConflictsheetForm.value.MemberName,
     GenName : this.ConflictsheetForm.value.GenName,
     Type : this.ConflictsheetForm.value.Type,
     Project_Name : this.ConflictsheetForm.value.Project_Name,
     Release : this.ConflictsheetForm.value.Release,
     Change_Type : this.ConflictsheetForm.value.Change_Type,
     Developer : this.ConflictsheetForm.value.Developer,
     CCID : this.ConflictsheetForm.value.CCID,
     Conflict : this.conflict,
     MissingInEndevor : this.MissingInEndevor  
     
   } ;
 
   this._ObjectServices.Updelement(newformdata.id,newformdata).subscribe(data=>{
    
   //   setTimeout(() => {
    this.spinner.hide(); 
   //      }, 5000));
  
    this.Update_Endvdata()});
    
  }
 
     /*----------------------Delete method -------------------------------------------*/
  Delelement(id) {
    this.spinner.show();
  this._ObjectServices.Delelement(id).subscribe(data=>
  //  setTimeout(() => {
   //   this.spinner.hide();
  //     }, 5000));
  {console.log('Deleted succesfully')
  this.spinner.hide();
  this.Update_Endvdata()});

  }

  Update_Endvdata()
  { //console.log("test1")
    let MissingConflict = "Yes"
    for (let k = 0 ;k < this.Endvdata.length && k < maximum_object ;k++)
        {  
          for(let i =0;  i <  this.Objdata.length && i < maximum_object ; i++ )
           {
              if (this.Endvdata[k].MemberName == this.Objdata[i].MemberName && 
                  this.Endvdata[k].Type == this.Objdata[i].Type )
                  {MissingConflict = "No"
                  break
                  }
            }  /*loop for object data*/

            if (this.Endvdata[k].MissingConflict != MissingConflict)
                {this.Endvdata[k].MissingConflict = MissingConflict
                this._EndvServices.UpdEndv(this.Endvdata[k].id,this.Endvdata[k])
                .subscribe(data=>{console.log('updated succesfully',this.Endvdata[k])}
                          );
                } /*End-of IF*/
                                                
         } /*loop for endevor data*/ 
  }  /*End-of Update_Endvdata*/ 
} /*End-of total component*/ 
