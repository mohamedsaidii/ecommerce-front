import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  carItems: CartItem[]=[];
  totalPrice:number =0.00;
  totalQuantity:number=0;
  constructor(private carteService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
   //get a handle to the cart items
   this.carItems = this.carteService.cartItems;
   // subsbribe to the cart totalPrice
   this.carteService.totalPrie.subscribe(
     data => this.totalPrice= data
   );
      // subsbribe to the cart totalQuantity
      this.carteService.totalQuantity.subscribe(
        data => this.totalQuantity= data
      );
      //compute cart total price and total quantity
      this.carteService.computeCartTotals();
  }
  incrementQuantity(theCartItem: CartItem)
  { 
    this.carteService.addToCart(theCartItem);
  }
  decrementQuantity(theCartItem: CartItem)
  { 
    this.carteService.decrementQuantity(theCartItem);
  }
  remove(theCartItem: CartItem)
  {
    this.carteService.remove(theCartItem);
  }

}
