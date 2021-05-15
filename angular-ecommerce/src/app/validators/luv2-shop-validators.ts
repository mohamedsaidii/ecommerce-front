import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {
    //white space
    static notOnlyWhitespace(control:FormControl):ValidationErrors{
        //check if string ol=nly conatins whitespace
        if((control.value != null ) && (control.value.trim().length === 0))
        {
            //invalid return error object
            return {
                'notOnlyWhitespace':true };
            }
            else
            {
                //valid, return null
                return null;

            }
        }
    }

