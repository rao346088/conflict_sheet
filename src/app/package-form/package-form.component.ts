import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import { PackageService } from '../package.service';
import { PackageComponent } from '../Package/package.component';
import { objNameValidator } from '../Shared/objectName.validator';


@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.css']
})

export class PackageFormComponent implements OnInit{
     public duplicateValue = false;
     public dt = new Date();
     public dt1 = this.dt.toLocaleString();
     public package:any= [];
     PackageListForm: FormGroup;
     public ObjHasError = false
  maxid: number;

  get ObjectName() 
 {
    return this.PackageListForm.get('ObjectName');
 }
 get ObjectTYPE() 
 {
    return this.PackageListForm.get('ObjectTYPE');
 }
 validateObjectTYPE(value)
 {
   if(value === 'default'){
      this.ObjHasError = true
   }else{
     this.ObjHasError = false
   }
 }
  constructor(private _packageService:PackageService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private _auth:AuthService) { }
  ngOnInit(): void {
    this.spinner.hide();
    this.PackageListForm = this.fb.group({
      Id: [''],
      ObjectName: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(8) ]],
      ObjectTYPE: ['']
     },{validators:[ objNameValidator]});
    this._packageService.getPackages()
       .subscribe(data => {this.package = data;}) ;
       
       this._auth.getUser(); 
  }

  GetMaxId(){
    this.maxid = 0;
             for(let k=0; k < this.package.length && k < 1000; k++ )
             {
               if( this.package[k].id > this.maxid)
               {
                    this.maxid = this.package[k].id ;
               }
               
            }
  
            console.log("maxid", this.maxid);
       
  }
  onSubmit() {
    this.spinner.show();
    this.GetMaxId()
    console.log('this._auth.currentemail',this._auth.currentemail)
    console.log("this.PackageListForm.value",this.PackageListForm.value);
    console.log("this.packagengSubmit",this.package)
   
    this.DupCheck(); 
    console.log("this.duplicateValue",this.duplicateValue)
    if (!this.duplicateValue)
    {
     
    
      const Package_FormData =
      { 
         id:  this.maxid, 
         ObjectName: this.PackageListForm.value,
         ObjectTYPE: this.PackageListForm.value,
         Action:"Post",
         Created_by: this._auth.currentemail,
         Created_on: this.dt1,
         Updated_by:this._auth.currentemail,
         Updated_on:this.dt1
      }; 

      this._packageService.AddElement(Package_FormData)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      );
      
    }else
    
    {
      this.spinner.hide();
      console.log("error",this.duplicateValue)
    }
   
  }

  DupCheck(){
    this.duplicateValue = false;
    console.log("this.packagedupcheck",this.package);
    for(let i = 0; i < this.package.length; i++){
       console.log("ObjectName",this.package[i].ObjectName)
       console.log("ObjectTYPE",this.package[i].ObjectTYPE)
       console.log("FORM.ObjectName",this.PackageListForm.value.ObjectName)
       console.log("FORM.ObjectTYPE",this.PackageListForm.value.ObjectTYPE)
       if(this.package[i].ObjectName !=='undefined')
       {
          if(this.package[i].ObjectName.trim().toUpperCase()==this.PackageListForm.value.ObjectName.trim().toUpperCase() &&
            this.package[i].ObjectTYPE.trim().toUpperCase()==this.PackageListForm.value.ObjectTYPE.trim().toUpperCase())
            {
              this.duplicateValue  = true;
              break; 
            }
      } else{continue}
   
  }
  }
}
  

