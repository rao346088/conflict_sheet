import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';

/*-----------------------------Selected column fileter Begin---------------------------*/
/*export const CONDITIONS_LIST = [
  { value: "nono", label: "Nono" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
  { value: "is-equal", label: "Is equal" },
  { value: "is-not-equal", label: "Is not equal" }
];

export const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
  "is-empty": function (value, filterdValue) {
    return value === "";
  },
  "is-not-empty": function (value, filterdValue) {
    return value !== "";
  },
  "is-equal": function (value, filterdValue) {
    return value == filterdValue;
  },
  "is-not-equal": function (value, filterdValue) {
    return value != filterdValue;
  }
};*/
/*-----------------------------Selected column fileter end---------------------------*/


@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  constructor(public _authService:AuthService) { }

  data = [
    {property : 'a'},
    {property : 'b'},
    {property : 'c'},
    ];

 get properties () {
   return this.data.map( (o)=> o.property );
 }

  ngOnInit(): void {

  
    
  }
 }