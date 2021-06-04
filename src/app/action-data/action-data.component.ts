import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-action-data',
  templateUrl: './action-data.component.html',
  styleUrls: ['./action-data.component.css']
})
export class ActionDataComponent implements OnInit {
  
  public logData;
  ActionDataForm:FormGroup ;

  constructor(private fb: FormBuilder, private _auth:AuthService) { }

  ngOnInit(): void {
    this.ActionDataForm = this.fb.group({
      ID: [''],
      action: [''],
      Sname:[''],
      createdBy:[''],
      createdOn:[''],
      updatedBy:[''],
      UpdatedOn:['']
      },{});

      this._auth.ReadUser()
      .subscribe(data=> {this.logData=data});
      console.log("Action data",this.logData)
  }
  

  
}
