import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/Table';
import { MatSort} from '@angular/material/Sort';
import { MatPaginator} from '@angular/material/Paginator';
import { TObject,IObject} from '../objects';
import { ObjectsService } from '../objects.service';
import { ObjectFormComponent} from '../object-form/object-form.component'
import { EndvService } from '../endv.service';
import { NgxSpinnerService } from 'ngx-spinner';
//import { Console } from 'console';
//import { timeStamp } from 'console';


@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit  {
  public duplicate = false;
  public MissingInEndevor ="No"
  public Loadid = 0 ;
  public Maxid = 0;
  public MLresp =[];
  public ObjectList =[];
  public errorMsg;
  public selectedRow= 0 ;
  public MissingConflict= ["Yes","No"]
  public LMissingInEndevor= ["Yes","No"]
  public Endvdata = [];
  public LConflict = ["yes","No"]
 
 
  public filteredList =[];
  public filteredList_Column= [];
  public filteredList_All= [];
  public Filter_value = [];

  public Selected_Member = []; 
  public Selected_Type = [];
  public Selected_Project_Name = [];
  public Selected_Release = [];
  public Selected_Change_Type = [];
  public Selected_Developer = [];
  public Selected_CCID = [];
  public Selected_Conflict = [];
  public Selected_MissingInEndevor= [];
  public SpinnerPercentage = 0.00
  public counts = [];
  

  constructor(private _ObjectServices: ObjectsService,
              private spinner: NgxSpinnerService, 
               private _EndvServices: EndvService
    ) {}

  /*-----------------Mat table content content------------------------------*/
OBJECT_DATA : TObject[];
displayedColumns: string[] = [ "Select",
                                'id',
                               'MemberName',
                               'Type',
                               'Project_Name',
                               'Release',
                               'Change_Type',
                               'Developer',
                               'CCID',
                               'Conflict',
                               'MissingInEndevor',
                              
                   //            'Delete',
                               'Edit',
                               'GenName', ];
//dataSource = new MatTableDataSource<TObject>(this.OBJECT_DATA);
dataSource = new MatTableDataSource<TObject>(this.ObjectList)
/*-----------------Mat sort /pagination------------------------------*/ 
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(ObjectFormComponent) formref :ObjectFormComponent;



ngOnInit() {
 // console.log("ngOnInit")
// setTimeout(() => {
  /** spinner ends after 5 seconds */
// this.spinner.hide();
// }, 5000);
  
  /*-----------------Mat table content content------------------------------*/
   
     let resp1 = this._ObjectServices.getObjects();
     //console.log("test1")
     this._ObjectServices.getObjects()
            resp1.subscribe(data =>{
        //      console.log("test2");
              this.ObjectList = data;
                           {this.dataSource.data = data; 
                            this.getEndvorData();
                            } 
                           this.dataSource.data.forEach(obj => {
                            obj.Select = false});
                         },
                           error => this.errorMsg = error
      );
      //console.log("test3")
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      
   };
  getEndvorData(){
    let resp2 = this._EndvServices.getEndv();
    //console.log("test4")
    this._EndvServices.getEndv()
          resp2.subscribe(data =>{
      //      console.log("test5")
                            this.Endvdata = data;
                            this.getMissingInEndevor()
                             this.getConflict()})
  }
   
   getMissingInEndevor(){
    //console.log("test conflit");
    for(let i = 0; i < this.dataSource.data.length; i++){
   //   console.log("test 1",this.dataSource.data[i])

      this.dataSource.data[i].MissingInEndevor= "Yes"
      for(let j=0; j< this.Endvdata.length; j++){
  //     console.log("endoverdata",this.Endvdata[j]);

        if(this.dataSource.data[i].MemberName==this.Endvdata[j].MemberName &&
          this.dataSource.data[i].Type==this.Endvdata[j].Type){
            this.dataSource.data[i].MissingInEndevor="No"
            break;
          }
           
        }
   
    }
   // console.log("this.dataSource.data",this.dataSource.data)
   }
   getConflict(){
    for(let i = 0; i < this.dataSource.data.length; i++){
         //console.log("test 1",this.dataSource.data[i])
   
         this.dataSource.data[i].Conflict= "No"
         for(let j=0; j< this.dataSource.data.length; j++){
           if(i==j){ continue }
           else{

           //console.log("test2",this.Endvdata[j])
           if(this.dataSource.data[i].MemberName==this.dataSource.data[j].MemberName &&
              this.dataSource.data[i].Type==this.dataSource.data[j].Type &&
             //   console.log("test3")
              this.dataSource.data[i].Project_Name!=this.dataSource.data[j].Project_Name){
               // console.log("test4")
                this.dataSource.data[i].Conflict="Yes"
                break;
              }       
            }  
   }
  }
}
   /*-----------------Mat table sort /pagination content content------------------------------*/
    ngAfterViewInit(){
      //console.log("ngAfterViewInit")
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.SpinnerPercentage = this.formref.SpinnerPercentage
      this.counts = this.formref.counts
  }

  /*-----------------Select All------------------------------*/
 onChangeSelectAll(event) {
   //console.log("test1")
  if (event.checked) {
   this.dataSource.data.forEach(obj => {
          obj.Select = true;
      });
  }
  else {
   this.dataSource.data.forEach(obj => {
          obj.Select = false;
      });
  }

}

/* delete all selected */
ProcessDelete()
{
  this.spinner.show();
  console.log("show spinner");
   //console.log("this.dataSource.data",this.dataSource.data)
  this.SpinnerPercentage = 50
  this.dataSource.data.forEach((obj ,index) => {
 //   this.SpinnerPercentage = this.SpinnerPercentage + (index/(2*this.dataSource.data.length))
   // console.log("obj.Select",obj.Select ,obj.id)
    if (obj.Select == true)
    {
      
      this._ObjectServices.Delelement(obj.id).
      subscribe(data=>{console.log('Deleted succesfully',obj.id)
         
         //      setTimeout(() => {
         //        /** spinner ends after 5 seconds */
                this.spinner.hide();
         //       }, 5000);}
                });
      
    }
  });  

}
/* delete all selected */
   /*-----------------Member Name filter ------------------------------*/
    setupFilter(column: string) {
        //console.log(this.ObjectList)
        this.dataSource.filterPredicate = (d: TObject, filter: string) => {
        const textToSearch = d[column] && d[column].toLowerCase() || '';
        return textToSearch.indexOf(filter) !== -1;
     };
    }
    
      MemberFilter(Member: string)
      {
      this.dataSource.filter = Member.trim().toLowerCase()
      }
  /*-----------------Type filter ------------------------------*/
       setupFilter1(column: string) {
        //console.log(column)
        this.dataSource.filterPredicate = (d: TObject, filter: string) => {
        const textToSearch = d[column] && d[column].toLowerCase() || '';
        return textToSearch.indexOf(filter) !== -1;
     };
    }
   
  FilterObj(){
    this.filteredList_All = this.ObjectList
    
 //   this.Filter_value = this.Selected_Type
 //   this.AppFilter("Member",this.Filter_value)

    this.Filter_value = this.Selected_Type
    this.AppFilter("Type",this.Filter_value)
    
    this.Filter_value = this.Selected_Project_Name
    this.AppFilter("Project_Name",this.Filter_value)

    this.Filter_value = this.Selected_Release;
    this.AppFilter("Release",this.Filter_value)

    this.Filter_value = this.Selected_Change_Type;
    this.AppFilter("Change_Type",this.Filter_value)

    this.Filter_value = this.Selected_Developer;
    this.AppFilter("Developer",this.Filter_value)

    this.Filter_value = this.Selected_CCID ;
    this.AppFilter("CCID",this.Filter_value)

    this.Filter_value = this.Selected_Conflict;
    this.AppFilter("Conflict",this.Filter_value)

    this.Filter_value = this.Selected_MissingInEndevor;
    this.AppFilter("MissingInEndevor",this.Filter_value)
   
    this.dataSource.data = this.filteredList_All
  }
    
  AppFilter(column:any,Filter_value: any)
   { this.filteredList_Column=[]
    // console.log("Filter_value",Filter_value ,column )
     if (Filter_value.length > 0)
         {  
           for(let i = 0; i < Filter_value.length;i++) 
            { 
              this.filteredList = []; 
             this.filteredList = this.filteredList_All.filter( (o) =>
             (o[column]==Filter_value[i]))
                    
             this.filteredList_Column = this.filteredList_Column.concat(this.filteredList)
             
            } 
            this.filteredList_All = this.filteredList_Column
           // console.log("this.filteredList_All ",this.filteredList_All )
         } 
     else
        {this.dataSource.data = this.ObjectList}
           
   }
  
/*-----------------------------------selected column filter --------------------------*/
  
  clearfilter() {
   this.Selected_Type = [];
   this.Selected_Project_Name = [];
   this.Selected_Release = [];
   this.Selected_Change_Type = [];
   this.Selected_Developer = [];
   this.Selected_CCID = [];
   this.Selected_Conflict = [];
   this.Selected_MissingInEndevor= [];
   this.dataSource.data = this.ObjectList
}
    
  /*-----------------------------------selected column filter --------------------------*/
  
  }

