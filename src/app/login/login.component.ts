import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData:any = {}
   public loginError = ' '
  LoginForm:FormGroup ;

  get email() 
  {
     return this.LoginForm.get('email');
  }
 
  get password() 
  {
     return this.LoginForm.get('password');
  }

  constructor(public _auth:AuthService, 
              private _router:Router,
              private fb: FormBuilder)  { }

  ngOnInit(): void {
  

  this.LoginForm = this.fb.group({
  email: ['', [Validators.required]],
  password: ['', [Validators.required]]
  },{});
 
}

 

    loginUser(){
      console.log("test login",this.LoginForm.value)
      this._auth.loginUser(this.LoginForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.logData.token)
          console.log("lgin ts", res.logData.token);
          //console.log(this._auth.getUser())
          if(res.logData.Role=='ITIBSE'){
          this._router.navigate(['/master-lookup'])
          } else{
            this._router.navigate(['/object-list'])
          }  
        },
        err => {
         // console.log("logints.errors",err)
        this.loginError = err.status + ':' + err.error;
        
        })
    }
  }

