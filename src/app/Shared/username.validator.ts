import { AbstractControl } from "@angular/forms";


export function UserNameValidator(control: AbstractControl):  { [key: string]: boolean } | null {
    const email = control.get('email');
    if (email.pristine) {
        return null;
      }
    return (email.value.startsWith("p")==false)? { 'UName': true } : null;
}