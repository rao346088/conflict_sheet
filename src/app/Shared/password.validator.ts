import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  
  if (password.pristine) {
    return null;
  }
  if(password.value.length == 0){
    return {'required': true , 'invalid': true}
  }
   if(password.value.length < 8){
    return {'minLength': true , 'invalid': true  }
   }
  

}