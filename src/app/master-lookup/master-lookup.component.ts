import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute ,ParamMap ,Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/Table';
import { MatSort} from '@angular/material/Sort';
import { MatPaginator} from '@angular/material/Paginator';
import { MasterLookupService } from '../master-lookup.service';
import { MLLayout ,MLTLayout} from '../objects';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ForbiddenNameValidator } from '../Shared/MemName.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

 
@Component({
  selector: 'app-master-lookup',
  templateUrl: './master-lookup.component.html',
  styleUrls: ['./master-lookup.component.css']
  })
export class MasterLookupComponent implements OnInit {

  public selectedId;
  public errorMsg;
  public MLduplicate = false;
  public update_id = 0 ;
  public Maxid = 0;
  public MLresp = [];
  public LTypex = [];
  public currUserRole;
  public dt = new Date();
  public dt1 = this.dt.toLocaleString();

 get MLType() 
 {
    return this.MasterLookupForm.get('MLType');
 }

  get MLName()
 {
    return this.MasterLookupForm.get('MLName');
 }

  
  OType=['OBJECT_TYPE',
         'PROJECT_NAME',
         'RELEASE #',
         'DEVELOPER',
         'CHANGE_TYPE',
         'CCID']
  
  TypeHasError = false;
 
  validateType(value)
  {
  if (value === 'default') 
    {
      this.TypeHasError = true;
    }   else 
    {
     this.TypeHasError  = false;
    }
    
  }
  
  MasterLookupForm: FormGroup;
  submitted = false;
  
  /*--------------------------------------------Side Nav ------------------------------------------------------------------*/
  opened = false;

  log(state) {
    console.log(state)
  }

get LType()
{
  this.LTypex = this.MLresp.filter( (o) =>
  (o.MLType=="OBJECT_TYPE"))

  return this.LTypex.map( (o) =>  
   (o.MLName))
}

  /*--------------------------------------------Side Nav ------------------------------------------------------------------*/

  constructor(private fb: FormBuilder,
              private router: Router ,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private _masterLookupService: MasterLookupService,
              public _auth:AuthService) {
             
               }

  MasterList=[{"id" : 1, "MLType" : 'OBJECT_TYPE'},
              {"id" : 2, "MLType" : 'PROJECT_NAME'},
              {"id" : 3, "MLType" : 'RELEASE #'},
              {"id" : 4, "MLType" : 'DEVELOPER'},
              {"id" : 5, "MLType" : 'CHANGE_TYPE'},
              {"id" : 6, "MLType" : 'CCID'}
            ];

/*---------------------------------Look up table  data ------------------------------------------------------------------------------------*/
OBJECT_DATA : MLTLayout[];
displayedColumns: string[] = [ 'id','MLType','MLName','Delete','Edit'];
//dataSource = new MatTableDataSource<MLLayout>(this.OBJECT_DATA);
dataSource = new MatTableDataSource<MLLayout>(this.MLresp)
/*-----------------Mat sort /pagination------------------------------*/ 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

/*------------------------------------------------------------------------------------------------------------------------------------------*/

  ngOnInit(): void {
    console.log("Test1")
 this.route.paramMap.subscribe((params: ParamMap) => {
   let id = parseInt(params.get('id'));
   this.selectedId = id;
  });

  /*-----------------Form content validation------------------------------*/
  this.MasterLookupForm = this.fb.group({
    MLType: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
    MLName: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(35),ForbiddenNameValidator(/p /)]]
  });
    
   /*-----------------Mat table content content------------------------------*/
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
   let resp = this._masterLookupService.getMLO();
   this._masterLookupService.getMLO()
         resp.subscribe(data =>{this.dataSource.data = data;
          console.log("master lookup data ",data)},
          err => {
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 401) {
                this.router.navigate(['/login'])
              }
            }
          }
     );
 
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
       this.dataSource.filter = this.MasterList[0].MLType.trim().toLowerCase()
     
       this.MasterLookupForm.setValue({
        MLType : this.MasterList[0].MLType,
        MLName : ''
        
      });
     this._auth.getUser();
     
                 //console.log("this.currUserRole",this._auth.currentUser)
  }

   /*-----------------Submit button------------------------------*/ 
   onSubmit()
  {  /*---- onsubmit*/
    this.spinner.show();
    console.log(this.MasterLookupForm)
    const numRows = this.dataSource.data.length
  
    this.Maxid = 0
    this.MLduplicate = false;
     /*--------------------------------Figure out duplicate and maxid ---------------------------------------------------------------*/
    for(let i = 0; i < numRows;i++)
     { /*---- For loop for looking datasource*/
       if (this.Maxid < this.dataSource.data[i].id)
       { /*---- Loop to maximum id */
          this.Maxid == this.dataSource.data[i].id
       } /*---- End- Loop to maximum id */
       console.log("duplicate",this.MLduplicate)
       if( this.dataSource.data[i].MLType == this.MasterLookupForm.value.MLType.trim().toUpperCase() && 
           this.dataSource.data[i].MLName ==this.MasterLookupForm.value.MLName.trim().toUpperCase()  &&
           this.MLduplicate == false)
       { 
        this.MLduplicate = true;
       }
     } /*---- End- For loop for looking datasource*/

     let loadid = 0 ;
     loadid = this.Maxid ;
    
    if (this.MLduplicate == false)
     { /*---- If not dupliate*/
      /*--------------------------------Not duplicate add the element ---------------------------------------------------------------*/
      console.log("duplicate2",this.MLduplicate)
      const FORM_DATA =
       { 
        id :  loadid  ,
        MLType : this.MasterLookupForm.value.MLType.trim().toUpperCase(),
        MLName : this.MasterLookupForm.value.MLName.trim().toUpperCase(),
        Action:"Post",
        Created_by: this._auth.currentemail,
        Creater_on: this.dt1,
        Updated_by: this._auth.currentemail,
        Updated_on: this.dt1
       } ; /*---- End form data*/
      
           this._masterLookupService.AddMLO(FORM_DATA)
             .subscribe(data =>           
              { console.log('Success!', data)}
              
         );
         setTimeout(() => {
          this.spinner.hide();
           }, 5000);
     } /*---- End-If not dupliate*/
     else
    { /*---- If not Dupliate*/
      /*--------------------------------Duplicate load the form back ---------------------------------------------------------------*/
            
      this.MasterLookupForm.setValue({
        MLType : this.MasterLookupForm.value.MLType,
        MLName : this.MasterLookupForm.value.MLName})
    } /*---- End-If Dupliate*/
  } /*---- End-onsubmit*/
    

   /*-----Update element --------------------------------------------------------------*/
  
   UpdMLO(id) 
   {  /*-----UPDMLO ----*/
      this.spinner.show();
      const newformdata = { 
      id :  this.update_id  ,
      MLType : this.MasterLookupForm.value.MLType.trim(),
      MLName : this.MasterLookupForm.value.MLName
    } ;
  
    this._masterLookupService.UpdMLO(newformdata.id,newformdata).subscribe(data=>
      {console.log('updated succesfully');
      setTimeout(() => {
        this.spinner.hide();
         }, 5000);
        }
      
      );
   } /*-----ENDUPDMLO ----*/
   /*----------------------Delete method -------------------------------------------*/
     
   DelMLO(id) 
   {
        this.spinner.show();
        this._masterLookupService.DelMLO(id).subscribe(data=>
          
      {console.log('Deleted succesfully');
      setTimeout(() => {
        this.spinner.hide();
         }, 5000);
        }
     
      );
   }
  
  /*----------------------------load form data----------------------------*/
  
  Loadform(a ,b,c)
  {
    this.update_id= a ;
    this.MasterLookupForm.setValue({
      MLType : b,
      MLName : c
    });
  }
   
  /*-----------------Mat table sort /pagination content content------------------------------*/
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
/*-----------------Mat table sort /pagination content content------------------------------*/

  onSelect(RelList) 
  {
      this.dataSource.filter = RelList.MLType.trim().toLowerCase()
     
       this.MasterLookupForm.setValue({
        MLType : RelList.MLType,
        MLName :''
        
      });
      
      }
   isSelected(RelList) { return RelList.id === this.selectedId; }

}