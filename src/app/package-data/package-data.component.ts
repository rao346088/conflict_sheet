import { Component,  AfterViewInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser , NgxCSVParserError } from 'ngx-csv-parser';

import { MatTableDataSource} from '@angular/material/Table';
import { MatSort} from '@angular/material/sort'; 
import { MatPaginator} from '@angular/material/paginator';
import { PackageService } from '../package.service';
import { IPackage,PackCnt } from '../package';
import { count } from 'rxjs/operators';


@Component({
  selector: 'app-package-data',
  templateUrl: './package-data.component.html',
  styleUrls: ['./package-data.component.css']
})
export class PackageDataComponent implements AfterViewInit  
{
  public packageList:any[] = [];
  displayedColumns: string[] = ['ObjectTYPE', 'Count'];
  dataSource = new MatTableDataSource<PackCnt>(this.packageList);

  public LType :PackCnt[]
  public ULlength = 0
  public UtypeFound: boolean;
  constructor(private ngxCsvParser: NgxCsvParser, 
    private _packageService:PackageService
   ) { 
    }
  
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
 package: IPackage[];




ngAfterViewInit()
{
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}
ngOnInit(): void {
  this._packageService.getPackages()
  //this._packageService.getobjects(this.packageList);
 .subscribe(data => {this.packageList = data;
  this.UnicValue();
  console.log("ngonit ", this.packageList)
 this.dataSource.data= this.LType;

 }) ;
     //console.log("this.dataSource.data " , this.dataSource.data)
      
}
UnicValue(){
  //this.LType=this.dataSource.data;
 console.log("this.packageList",this.packageList);
 for(let i=0; i < this.packageList.length; i++){
   if(i==0){
   // this.LType[0] = []
     console.log("this.packageList[i].ObjectTYPE.trim().toUpperCase()",this.packageList[i].ObjectTYPE.trim().toUpperCase())
        
    // this.LType[0].ObjectTYPE = this.packageList[i].ObjectTYPE.trim().toUpperCase();
    // this.LType[0].cnt = 1
       this.LType.push({ "id" : 0,
                        "ObjectTYPE" : this.packageList[i].ObjectTYPE.trim().toUpperCase(),
                        "cnt" : 1});
   }else{
    this.UtypeFound=false;
     for(let k=0; k<this.LType.length; k++){
      
       if(this.packageList[i].ObjectTYPE.trim().toUpperCase() == this.LType[k].ObjectTYPE){
      this.UtypeFound=true;
      this.LType[k].cnt ++
      
  }
  this.ULlength = this.LType.length
}   
     if(!this.UtypeFound){
    //  this.LType[this.ULlength] = []
    //  this.LType[this.ULlength].ObjectTYPE= this.packageList[i].ObjectTYPE.trim().toUpperCase();
    //  this.LType[this.ULlength].cnt = 1;
    this.LType.push({id : this.ULlength,
      ObjectTYPE : this.packageList[i].ObjectTYPE.trim().toUpperCase(),
      cnt : 1});
    console.log("LType",this.LType) 
    }
   }
 }
}
/*---------Unic value finding end------------*/
}
