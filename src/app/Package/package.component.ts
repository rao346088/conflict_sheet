import { Component,  AfterViewInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser , NgxCSVParserError } from 'ngx-csv-parser';

import { MatTableDataSource} from '@angular/material/Table';
import { MatSort} from '@angular/material/sort'; 
import { MatPaginator} from '@angular/material/paginator';
import { PackageService } from '../package.service';
import { IPackage } from '../package';
import { ObjectsService } from '../objects.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';


@Component({
  selector: 'package-root',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})


export class PackageComponent implements AfterViewInit
 {
  
  
  public dt = new Date();
  public dt1 = this.dt.toLocaleString();
  public csvdata:any = [];
  public csvRecords: any[] = [];
  public header: boolean = false;
  public errorMsg :any;
  public ladata: any;
  public maxid= 0;
  public count:number = 0;
  
  public Selected_Type = [];
  public LType:any[] = [];
  public packageList:any[] = [];
  public objectList:any[] = [];
  public filteredList =[];
  public filteredList_Column= [];
  public filteredList_All:any[] = [];
  public Filter_value = [];
  public SpinnerPercentage = 0.00;
  public LMissing = ["yes","no"];
  public Selected_MissingElement = [];
  public  UtypeFound = false;
  public Uval:any;
  constructor(private ngxCsvParser: NgxCsvParser, 
              private _packageService:PackageService,
              private spinner: NgxSpinnerService,
              private _auth:AuthService,
             private _ObjectsService:ObjectsService   ) { 

              }
/*-------------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------------*/
  OBJECT_DATA: IPackage[] = [];
  displayedColumns: string[] = ['id', 'ObjectName', 'ObjectTYPE','MissingElement','Select','Delete'];
  dataSource = new MatTableDataSource<IPackage>(this.packageList);
/*-----------------Mat sort /pagination------------------------------*/ 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
/*--------------------------------------------------------------------*/
ngOnInit() : void {
  this._packageService.getPackages()
  //this._packageService.getobjects(this.packageList);
 .subscribe(data => {this.packageList = data;

  //console.log("ngonit ", this.packageList)
  this.dataSource.data = this.packageList;
  this. UnicValue();
  this.GetMaxId();
  this.ObjectRead1();
  
 }) ;

     
      //console.log("this.dataSource.data " , this.dataSource.data)
      
}
/*-----------maxId Method Start----------------------*/
GetMaxId(){
  this.maxid = 0;
           for(let k=0; k < this.packageList.length && k < 1000; k++ )
           {
             if( this.packageList[k].id > this.maxid)
             {
                  this.maxid = this.packageList[k].id ;
             }
             
          }

          console.log("maxid", this.maxid);
     
}
/*-----------------MaxId end-------------*/     

/*----------Object Read------------------------------*/
ObjectRead1(){
  let resp1 = this._ObjectsService.getObjects();
this._ObjectsService.getObjects()
      resp1.subscribe(data =>{this.objectList = data;
        this.MissingElement();},
                     error => this.errorMsg = error
);
}

MissingElement(){

  //console.log("this.packageList",this.packageList)
  //console.log("this.objectList",this.objectList)
  for(let i = 0; i<this.packageList.length; i++){
    this.packageList[i].MissingElement = "No"
    for (let k = 0; k < this.objectList.length; k++){
       if ( this.packageList[i].ObjectName==this.objectList[k].MemberName &&
        this.packageList[i].ObjectTYPE==this.objectList[k].Type){
          this.packageList[i].MissingElement  = "Yes"; 
          break;     
      }
    }
  }
}
/*----------Object Read end------------------------------*/
  ngAfterViewInit(): void 
    {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
        } /* Ngonit  closing */


  @ViewChild('fileImportInput' ) fileImportInput: any;

  fileChangeListener($event: any) :void | null  
 {
    // this.spinner.show();
    const files = $event.srcElement.files;
    this.header = true

   this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
          .pipe().subscribe((result:any) => 
           {
           this.csvRecords=  result;

           this.csvdata = (this.csvRecords).map
           ( (o) =>
            ({ "id"         : o.id,
               "ObjectName" : o.ObjectName,
               "ObjectTYPE" : o.ObjectTYPE,
               "Action":"Post",
               "Created_by": this._auth.currentemail,
               "Created_on": this.dt1,
               "Updated_by":this._auth.currentemail,
               "Updated_on":this.dt1
             })/*parser loop closing*/
           ); 
      
           let i = 0
           
           for(i; ( i < (<any>this.csvdata).length && i < 1000 ); i++ )  
           {    
            // console.log("this.csvdata", this.csvdata[i]);
            
             this.csvdata[i].id = this.maxid + i ;
             

            this._packageService.AddPackages(this.csvdata[i])
            .subscribe(data => { console.log(' Add Success!', this.csvdata[i]),
              (                       error: { statusText: any; }) => this.errorMsg = error.statusText})
              setTimeout(() => {
                this.spinner.hide();
                 }, 5000);

           };
          }, (error: NgxCSVParserError) => {
            console.log('Error', error);
          }); /*ngx parser closing*/
         
 } /* File change listener closing*/
 onChangeSelectAll(event: { checked: any; }) 
 {
  //console.log("test1")
 if (event.checked)
 {
  this.dataSource.data.forEach(obj => {
         obj.Select = true;
     });
 }
 else 
 {
  this.dataSource.data.forEach(obj => {
         obj.Select = false;
     });
 }
}

/*deleting all selected elements*/

 ProcessDelete()
  { 
    //this.spinner.show();
 //   console.log("this.dataSource.data",this.dataSource.data)
    this.SpinnerPercentage = 50
     this.dataSource.data.forEach((obj ,index) => {
     this.SpinnerPercentage = this.SpinnerPercentage + (index/(2*this.dataSource.data.length))
 //   console.log("obj.Select",obj.Select ,obj.id)
    if (obj.Select == true)
    {
      this._packageService.DelPackage(obj.id).
      subscribe(()=>{console.log('Deleted succesfully',obj.id)});
      setTimeout(() => {
        this.spinner.hide();
         }, 5000);
    }
  });  
/*deleting all selected elements*/

}
/* delete method*/
DelElement(id: any) {
 // console.log("text1");
  this._packageService.DelPackage(id).subscribe((data: any)=>
  {console.log('Deleted succesfully',data)}
  );
  }
  /*Delete method end*/

  /*---------Unic value finding------------*/
  UnicValue(){
        this.LType=[];
       //console.log("this.packageList",this.packageList);
       for(let i=0; i < this.packageList.length; i++){
         if(i==0){
           this.LType.push(this.packageList[i].ObjectTYPE);
         }else{
          this.UtypeFound=false;
           for(let k=0; k<this.LType.length; k++){
            
             if(this.packageList[i].ObjectTYPE==this.LType[k]){
            this.UtypeFound=true;
        }
     
    }
         
           if(!this.UtypeFound){
            this.LType.push(this.packageList[i].ObjectTYPE);
     //     console.log("LType",this.LType) 
          }
         }
       }
  }
/*---------Unic value finding end------------*/

  /*filter method*/
  FilterObj()
  {
    this.filteredList_All = this.packageList;
    this.Filter_value = this.Selected_Type;
    this.AppFilter("ObjectTYPE", this.Filter_value);

    this.dataSource.data = this.filteredList_All;
    this.Filter_value = this.Selected_MissingElement;
    this.AppFilter("MissingInEnd",this.Filter_value)
   
  }
  AppFilter(column:any,Filter_value:any)
  {
     this.filteredList_Column=[];
     if (Filter_value.length > 0)
     {
       
       for (let i = 0; i < Filter_value.length; i++ )
       {
        this.filteredList = [];
        this.filteredList = this.filteredList_All.filter( (x) =>
        (x[column] == Filter_value[i]))
        this.filteredList_Column = this.filteredList_Column.concat(this.filteredList);
      }
      this.filteredList_All = this.filteredList_Column;
     }
     else {
       this.dataSource.data = this.packageList;
     }
  }
  clearfilter(){
    this.Selected_Type= [];
    this.Selected_MissingElement= [];
    this.dataSource.data = this.packageList;
  }
 
} /*export class closing*/