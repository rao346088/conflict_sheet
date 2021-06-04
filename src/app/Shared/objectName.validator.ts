import { AbstractControl } from '@angular/forms';

export function objNameValidator(control: AbstractControl): { [key: string]: boolean} | null {
  const ObjTYPE = control.get('ObjectTYPE');
  const ObjName = control.get('ObjectName');

  if (ObjTYPE.pristine || ObjName.pristine) {
    return null;
  }
   return ObjTYPE && ObjName && 
((ObjTYPE.value == "CGPRADO" || ObjTYPE.value=="CGPRADB" ) && ObjName.value.toUpperCase().endsWith("PR")==false) ? { 'XpsName': true } : null;
  }
 