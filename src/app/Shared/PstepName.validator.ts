import { AbstractControl } from '@angular/forms';

export function PstepNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const Type = control.get('Type');
  const MemberName = control.get('MemberName');
 // console.log("pnamevalid",MemberName.value.toUpperCase().endsWith("PR"))
  if (Type.pristine || MemberName.pristine) {
    return null;}
   
   return Type && MemberName && 
  ((Type.value == "CGPRADO" || Type.value=="CGPRADB" ) && MemberName.value.toUpperCase().endsWith("PR")==false) ? { 'XpsName': true } : null;
  
  }
 