
/*--------smita change data- 4/2/2021 ------------------------------------*/
/*-------commenting code comparing CSV Data and endover data on json file---------------------------------------*/

import { Component, OnInit, ViewChild ,EventEmitter} from '@angular/core';
import { MatTableDataSource} from '@angular/material/Table';
import { MatSort} from '@angular/material/Sort';
import { MatPaginator} from '@angular/material/Paginator';
import { EndvService } from '../endv.service';

import { EndvLayout} from '../objects';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FilterItemDirective } from "../filter-item.directive";
import { ActivatedRoute ,ParamMap ,Router } from '@angular/router';
import { PstepNameValidator} from '../Shared/PstepName.validator';
import { ObjectsService } from '../objects.service';
import { MasterLookupService } from '../master-lookup.service';

import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { CSVLayout, EndvcsvLayout } from '../objects';
import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { NgxSpinnerService } from "ngx-spinner";
//import { Endvadd } from '../Shared/endvadd';


@Component({
  selector: 'app-endvor-list',
  templateUrl: './endvor-list.component.html',
  styleUrls: ['./endvor-list.component.css'
  ]
})
export class EndvorListComponent implements OnInit {

 
  public errorMsg;
  public MLresp =[];
  public Object_List =[];
  public Endvdata = [];
  public Selected_Type = [];
  public MissingConflict= ["Yes","No"]
  public IncorrectCCID= ["Yes","N/A","No"]
  public Maxid = 0;
  public id = 0;
  public MemberName = '';
  public CSVData = {};
  public duplicate = "No";
  public Spinnervalue = 0;
  public showSpinner = true;
  public SpinnerPercentage = 0.00
  csvRecords: EndvcsvLayout[];
  header: boolean = false;

  constructor(private ngxCsvParser: NgxCsvParser,
              public _EndvServices: EndvService,
              private _ObjectServices: ObjectsService,
              private spinner: NgxSpinnerService,
              private _MasterLookupServices: MasterLookupService,
    ) {
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    this.spinner.show();
    const files = $event.srcElement.files;
  //  this.header = (this.header as unknown as string) === 'true' || this.header === true;
    this.header = true
    console.log('start',files[0]);
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => 
    {
     /* Success -------------------------------*/ 
     // console.log(result)
        this.csvRecords=  result;
        (this.CSVData) = (this.csvRecords).map
        ( (o) =>
         ( { "id : Number": o.id,
             "MemberName" : o.MemberName,
             "GenName" : o.GenName,
             
             "Type" : o.Type,
             "Developer" : o.Developer,
             "CCID" : o.CCID,
             "MissingConflict": "No",
             "IncorrectCCID": "No"
             }
          )
        );
        this.spinner.hide();
          /*-------------------------------Load data -------------------------------------*/
          
          let i = 0
          for(i; ( i < (<any>this.CSVData).length && i < 1000 ); i++ )  
          {    console.log(i)
          /*--------------------------------Check for duplicate start ----------------------------*/        
          
               let j = 0
                for (j ;j < this.Endvdata.length && j < 1000 ;j++)
                {
                  if (this.CSVData[i].MemberName == this.Endvdata[j].MemberName && 
                      this.CSVData[i].Type == this.Endvdata[j].Type)
                     { this.duplicate = "Yes"
                        break
                     }
                  else
                   
                      
                     { this.duplicate = "No"
                     }
                }
          /*--------------------------------Check for duplicate end ----------------------------*/   
          /*--------------------------------Check for Missing in conflict sheet ----------------------------*/        
          /*let k = 0
          for (k ;k < this.Object_List.length && k < 1000 ;k++)
          {
         
            if (this.CSVData[i].MemberName == this.Object_List[k].MemberName && 
                this.CSVData[i].Type == this.Object_List[k].Type)
              /*--------------------------------Check for incorrect CCID Start----------------------------*/   
              /* { this.CSVData[i].MissingConflict = "No"
                 if (this.CSVData[i].CCID == this.Object_List[k].CCID)
                    {this.CSVData[i].IncorrectCCID = "No"}
                 else
              
                    {this.CSVData[i].IncorrectCCID = "Yes"}   
              /*--------------------------------Check for incorrect CCID end ----------------------------*/ 
                /*break
                }
            else    
             { this.CSVData[i].IncorrectCCID = "N/A"
               this.CSVData[i].MissingConflict = "Yes"}
          }
          
      /*--------------------------------Check Missing in conflict duplicate end ----------------------------*/ 
                  console.log("this.duplicate",this.duplicate)
                  if( this.duplicate == "No" )
                  {
                      this._EndvServices.AddEndv(this.CSVData[i])
                      .subscribe(data => { console.log(' Add Success!', data.id,data.MemberName),
                                 error => this.errorMsg = error.statusText})
                  }
            }    //For loop end 
                   
            this.Object_Upd()

      
    /* Failure -------------------------------*/         
         
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    
  } 

/*---------------------------------------------------Spinner ------------------------------------------------*/      
  SetSpinnervalue(){
    this.showSpinner = false ;
    
    console.log("setspinner" ,this.showSpinner)
    
  } 
  
/*---------------------------------------------------Cleanup  ------------------------------------------------*/
  Cleanup()
{
  this.spinner.show();
    let i = 0
    while (i < this.Endvdata.length - 1 )  
     {   
          i++ 
           if( i > 1000 )
             { break;}
           else  
             {
              let id=(this.Endvdata[i]["id"])
              console.log(i,id)
              this._EndvServices.DelEndv(id).
              subscribe(data=>{console.log('Deleted succesfully')});
              setTimeout(() => {
              this.spinner.hide();
               }, 5000);
              };
       } 
       
       this.Object_Upd()
}

/*---------------------------------------------------Object_update  ------------------------------------------------*/

Object_Upd(){
  
  for (let k = 0 ;k < this.Object_List.length && k < 1000 ;k++)
    
      {  this.Object_List[k].MissingInEndevor = "Yes"
          for(let i =0;  i < (<any>this.Endvdata).length && i < 1000 ; i++ )
           {
              if (this.Endvdata[i].MemberName == this.Object_List[k].MemberName && 
                  this.Endvdata[i].Type == this.Object_List[k].Type)
                  {console.log("match found")
                  this.Object_List[k].MissingInEndevor = "No"
                  break
                  }
                  
             }
                           
             this._ObjectServices.Updelement(this.Object_List[k].id,this.Object_List[k])
                          .subscribe(data=>{console.log('updated succesfully',this.Object_List[k])}
                    
                    );
   
           }
      }
  /*-----------------Mat table content content------------------------------*/
  
OBJECT_DATA : EndvLayout[];

displayedColumns: string[] = [ 'id',
                               'MemberName',
                               'Type',
                               'Developer',
                               'CCID',
                               'MissingConflict',
                               'IncorrectCCID',
                               'GenName'
                               ];
//dataSource = new MatTableDataSource<EndvLayout>(this.OBJECT_DATA);
 dataSource = new MatTableDataSource<EndvLayout>(this.Endvdata);
 
/*-----------------Mat sort /pagination------------------------------*/ 
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;


/*------------------------------------------------------------Clean up -------------------------------------*/

/*-----------------------------------------Filters -------------------------------------------------*/
get LTypex ()
{
  return this.MLresp.filter( (o) =>
   (o.MLType=="OBJECT_TYPE"))
}

get LType()
{
  return this.LTypex.map( (o) =>
   (o.MLName))
}


/*----------------------Lookup for Developer-------------------------------------------------------------*/
get LDeveloperx ()
{
  return this.MLresp.filter( (o) =>
   (o.MLType=="DEVELOPER"))
}

get LDeveloper()
{
  return this.LDeveloperx.map( (o) =>
   (o.MLName))
}
/*----------------------Lookup for CCID-------------------------------------------------------------*/
get LCCIDx ()
{
  return this.MLresp.filter( (o) =>
   (o.MLType=="CCID"))
}

get LCCID()
{
  return this.LCCIDx.map( (o) =>
   (o.MLName))
}

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner.hide();
     }, 5000);
  /*--------------------------------------Get Object details  --------------------------------------------------*/
  
  let resp3 = this._ObjectServices.getObjects();
  this._ObjectServices.getObjects()
      resp3.subscribe(data =>this.Object_List = data,
                  error => this.errorMsg = error
  );

 /*--------------------------------------Get masterlook up  details  --------------------------------------------------*/

  let resp = this._MasterLookupServices.getMLO();
  this._MasterLookupServices.getMLO()
      resp.subscribe(data =>this.MLresp = data,
                  error => this.errorMsg = error
  );
 /*--------------------------------------Get Endevor data  --------------------------------------------------*/
  let resp2 =  this._EndvServices.getEndv();

       this._EndvServices.getEndv()
      resp2.subscribe(data =>(<EndvLayout[]>this.Endvdata) = data,
                      
                   error => this.errorMsg = error
    );
  /*-----------------Mat table content content------------------------------*/
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
  
   
  let resp1 =  this._EndvServices.getEndv();

       this._EndvServices.getEndv()
      resp1.subscribe(data =>{(this.dataSource.data) = data; this.GetMissingConflit()},
                      
                   error => this.errorMsg = error
    );
    /*------------- missing conflit---------------------------*/
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      const numRows = this.dataSource.data.length
      this.Maxid = 0

      
  
       for(let i = 0; i < numRows;i++)
       {  /*---- For loop for looking datasource*/
         if (this.Maxid < this.dataSource.data[i].id)
         {/*---- Loop to maximum id */
            this.Maxid == this.dataSource.data[i].id
         }/*---- End- Loop to maximum id */
        } /*---- End- For loop for looking datasource*/
  
 
    }


    GetMissingConflit()
    {
     //   console.log("dataSourse",this.dataSource.data)
    for(let k=0; k < this.dataSource.data.length ; k++ ){

    //  console.log("missing conflit",this.dataSource.data[k]);
      this.dataSource.data[k].MissingConflict= "Yes"
      this.dataSource.data[k].IncorrectCCID = "N/A"

    //  console.log("object list", this.Object_List);
      for ( let j=0; j < this.Object_List.length; j++){
           
     //   console.log("dataSourse", this.dataSource.data[k].MemberName);
    //    console.log("Object_List", this.Object_List[j].MemberName);
        if(this.dataSource.data[k].MemberName==this.Object_List[j].MemberName &&
           this.dataSource.data[k].Type==this.Object_List[j].Type){
            this.dataSource.data[k].MissingConflict="No"
            if(this.dataSource.data[k].CCID == this.Object_List[j].CCID){
              this.dataSource.data[k].IncorrectCCID = "No"
            }
            else{
              this.dataSource.data[k].IncorrectCCID = "Yes"
            }
          }else
          {
                 
          }
      }
    }
  }



 
  /*-----------------Member Name filter ------------------------------*/
setupFilter(column: string) {
  console.log(column)
  this.dataSource.filterPredicate = (d: EndvLayout, filter: string) => {
  const textToSearch = d[column] && d[column].toLowerCase() || '';
  return textToSearch.indexOf(filter) !== -1;
};
}

MemberFilter(Member: string)
{
this.dataSource.filter = Member.trim().toLowerCase()
};

/*-----------------Type filter ------------------------------*/
setupFilter1(column: string) {
  console.log(column)
  this.dataSource.filterPredicate = (d: EndvLayout, filter: string) => {
  const textToSearch = d[column] && d[column].toLowerCase() || '';
  return textToSearch.indexOf(filter) !== -1;
};
}

TypeFilter(Selected_Type: any) {
  console.log("xxxx")
//     let selectedItem:any;
//    let selectedType = [];
//     selectedType = this.LType.map(x=> x.MLName)

//     selectedItem = this.selectedType.filter(item => item.MLName == Selected_Type)
  let filervalues = [];
  let X = String ;
  for(let i = 0; i < Selected_Type.length;i++)
   {
     
      console.log("YYY",Selected_Type[i])  
      filervalues[i] = Selected_Type[i].trim().toLowerCase() 
      console.log("YYY",filervalues[i]) 
      console.log("qqq",filervalues)
       this.dataSource.filter != Selected_Type[i].trim().toLowerCase()
              
   }
  }
/*-----------------MissingConflict filter ------------------------------*/
  setupFilter2(column: string) {
    console.log(column)
    this.dataSource.filterPredicate = (d: EndvLayout, filter: string) => {
    const textToSearch = d[column] && d[column].toLowerCase() || '';
    return textToSearch.indexOf(filter) !== -1;
 };
}
  
  MissingConflictFilter(MissingConflict: string) {
    this.dataSource.filter = MissingConflict.trim().toLowerCase();
       
    }

    /*-----------------IncorrectCCID filter ------------------------------*/
  setupFilter3(column: string) {
    console.log(column)
    this.dataSource.filterPredicate = (d: EndvLayout, filter: string) => {
    const textToSearch = d[column] && d[column].toLowerCase() || '';
    return textToSearch.indexOf(filter) !== -1;
 };
}
  
    IncorrectCCIDFilter(IncorrectCCID: string) {
    this.dataSource.filter = IncorrectCCID.trim().toLowerCase();
       
    }
/*-----------------Developer filter ------------------------------*/
setupFilter6(column: string) {
  console.log(column)
  this.dataSource.filterPredicate = (d: EndvLayout, filter: string) => {
  const textToSearch = d[column] && d[column].toLowerCase() || '';
  return textToSearch.indexOf(filter) !== -1;
 };
}

DeveloperFilter(Type: string) {
  this.dataSource.filter = Type.trim().toLowerCase();
     
  }

  /*-----------------CCID filter ------------------------------*/
setupFilter7(column: string) {
  console.log(column)
  this.dataSource.filterPredicate = (d: EndvLayout, filter: string) => {
  const textToSearch = d[column] && d[column].toLowerCase() || '';
  return textToSearch.indexOf(filter) !== -1;
 };
}

CCIDFilter(Type: string) {
  this.dataSource.filter = Type.trim().toLowerCase();
     
  }


   /*-----------------Mat table sort /pagination content content------------------------------*/
   ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}


