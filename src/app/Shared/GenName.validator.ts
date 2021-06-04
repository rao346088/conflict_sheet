import { AbstractControl } from '@angular/forms';
import { FormGroup, FormControl, FormArray, Validators ,FormBuilder } from '@angular/forms';

export function GenNameValidator(control: AbstractControl): {[key: string]: boolean } {
  
    const Type = control.get('Type');
  const GenName = control.get('GenName');
 // console.log(GenName.value.length)
//  console.log(Type.value)
  let GenType = new Set ([ "CGABB" , "CGABO" , "CGPRADO" , "CGPRADB" ,"PROCEDURE","SCREEN" ]);
  if (Type.pristine ) {
    return null;}

  
  if  (GenType.has(Type.value) )
  {   
      switch(true ) 
      { 
        case GenName.value.length == 0 :
          { // console.log("test2")
             return {'required': true , 'invalid': true}
           // GenName.setValidators([Validators.required ])
           // break;
                       
          }
        case GenName.value.length < 10 :
          {// GenName.setValidators([Validators.minLength(10) ])
           // break;
            return {'minlength': true , 'invalid': true }
          }  
        case GenName.value.length > 35 :
          {  //  GenName.setValidators([Validators.maxLength(35) ])
            //break;
             return {'maxlength': true , 'invalid': true}
          } 
         default:  { return null}
      } 
      //GenName.updateValueAndValidity({emitEvent: false})

     // for(let control in this.ConflictsheetForm.controls){            
     //   this.ConflictsheetForm.controls[control].setValue(this.ConflictsheetForm.controls[control].value, {emitEvent:false});
     // }
  } else
  
  {return null    }
    
  
  }
 