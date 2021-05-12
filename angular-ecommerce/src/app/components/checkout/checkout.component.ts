import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number =0;
  checkoutFormGroup: FormGroup; 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.checkoutFormGroup = this.formBuilder.group({
        //customer howa name mte3 formcontrole 
        ///formontrol = customer and formbuilder yaffecti lil formgroup lformcontrol mte3o

    customer: this.formBuilder.group({
      
      firstName: [''],
      lastName: [''],
      email: [''],
    }),
    shippingAddress: this.formBuilder.group({
      street:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:['']


    }),
    billingAddress: this.formBuilder.group({
      street:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:['']


    }),
    creditCARD: this.formBuilder.group({
       CardType:[''],
      nameOnCard:[''],
      cardNumber:[''],
      securityCode:[''],
      expirationMonth:[''],
      expirationYear:['']


    })
  });

}
onSubmit()
{
  console.log("Handling the subnmit button");
  console.log(this.checkoutFormGroup.get('customer').value );
}
copyShippingAddressToBillingAddress(event)
{
  if(event.target.checked) 
  {
    this.checkoutFormGroup.controls.billingAddress
       .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
  }
  else{
    this.checkoutFormGroup.controls.billingAddress.reset();
  }

}
  }

