import { Component, OnInit } from '@angular/core';
import { MasterLookupService } from '../master-lookup.service';

@Component({
  selector: 'app-lookup-read',
  templateUrl: './lookup-read.component.html',
  styleUrls: ['./lookup-read.component.css']
})
export class LookupReadComponent implements OnInit {

  public MLresp =[];
  public LTypex = [];
  public LProject_Namex = [];
  public LReleasex = [];
  public LChange_Typex = [];
  public LDeveloperx=[];
  public LCCIDx = [];
  public errorMsg;
  public ChildtestMsg = "testing message"
  public LMissingConflict = ["Yes","No"]
  public LIncorrectCCID = ["Yes","No"]

  get LType()
  {
    
  this.LTypex = this.MLresp.filter( (o) =>
  (o.MLType=="OBJECT_TYPE"))

  return this.LTypex.map( (o) =>
   (o.MLName))
  }

  

/*----------------------Lookup for Project_Name-------------------------------------------------------------*/

get LProject_Name()
{ 
  this.LProject_Namex = this.MLresp.filter( (o) =>
   (o.MLType=="PROJECT_NAME"))
   
  return this.LProject_Namex.map( (o) =>
   (o.MLName))
}

/*----------------------Lookup for Release-------------------------------------------------------------*/


get LRelease()
{ 
  this.LReleasex= this.MLresp.filter( (o) =>
   (o.MLType=="RELEASE #"))

  return this.LReleasex.map( (o) =>
   (o.MLName))
}
/*----------------------Lookup for Change_Type-------------------------------------------------------------*/

get LChange_Type()
{
  this.LChange_Typex= this.MLresp.filter( (o) =>
  (o.MLType=="CHANGE_TYPE"))

  return this.LChange_Typex.map( (o) =>
   (o.MLName))
}
/*----------------------Lookup for Developer-------------------------------------------------------------*/

get LDeveloper()
{ 
  this.LDeveloperx = this.MLresp.filter( (o) =>
   (o.MLType=="DEVELOPER"))

  return this.LDeveloperx.map( (o) =>
   (o.MLName))
}
/*----------------------Lookup for CCID-------------------------------------------------------------*/
get LCCID()
{ 
  this.LCCIDx = this.MLresp.filter( (o) =>
   (o.MLType=="CCID"))

  return this.LCCIDx.map( (o) =>
   (o.MLName))
}

/*----------------------Lookup for CCID-------------------------------------------------------------*/
  constructor(private _MasterLookupServices: MasterLookupService) { }

  ngOnInit(): void {

     let resp = this._MasterLookupServices.getMLO();
  this._MasterLookupServices.getMLO()
      resp.subscribe(
                 data =>this.MLresp = data,
                //   data =>console.log(data),
                  error => this.errorMsg = error
  );
  }

}
