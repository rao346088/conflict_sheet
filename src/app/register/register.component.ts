import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../Shared/password.validator';
import { UserNameValidator } from '../Shared/username.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm:FormGroup ;

  get email() 
  {
     return this.RegisterForm.get('email');
  }
 
  get password() 
  {
     return this.RegisterForm.get('password');
  }
   
  get Role(){
    return this.RegisterForm.get('Role')
  }

  constructor(private _auth:AuthService,
              private _router:Router,
              private fb: FormBuilder) { }

  registerUserData:any = {}

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      Role:['']
      },{validators:[PasswordValidator,UserNameValidator]});
  }   

  registerUser(){
    //console.log(this.registerUserData)
    this._auth.registerUser(this.RegisterForm.value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/object-list'])
      },
      err => console.log(err)
    )
  }
}
