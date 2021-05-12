import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
  import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-gride.component.html',
 // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  previousKeyword: string = null;


  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private cartService:  CartService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');


    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               theKeyword)
                                               .subscribe(this.processResult());
  

    // now search for the products using keyword

  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
  updatePageSize(pagesize:number){
    this.thePageSize=pagesize;
    this.thePageNumber=1;
    this.listProducts();

  }
  addToCart(theProduct: Product)
  {
    console.log(`Adding to cart: ${theProduct.name},${theProduct.unitPrice}`) ;
     

    const theCartItem= new CartItem(theProduct);
    this.cartService.addToCart(theCartItem)
  
  
  }
}






  

//   products:Product[]=[];
//   currentCategoryId :number = 1;
//   previousCategoryId: 1;

//   searchMode:boolean = false;
// //new properties for pagination 
// thePageNumber: number= 1;
// thePageSize: number =10;
// theTotalElements: number=0;


//   constructor(private productService:ProductService,
//               private route:ActivatedRoute ) { }


//   listProducts(){
//     this.searchMode = this.route.snapshot.paramMap.has('keyword');
//    if (this.searchMode){
//      this.handleSearchProduts();
//    }else {
//     this.handleListProducts();
    
//    }
//   }

//   handleSearchProduts(){


//     const  theKeyword: string = this.route.snapshot.paramMap.get('keyword'); 
//     //now search for the products using  keyword
//     this.productService.searchProducts(theKeyword).subscribe(
//         data => {
//           this.products =data;
//         }

//     )

//   }
//   handleListProducts() {
//     //check "id" parametre is available 

// const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
// if(hasCategoryId)
// {
//    //recuperer id et convertir en entier a l'aide de symbole +
//   this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
// }
// else{
//   //not category id available ...... default to category id 1
//   this.currentCategoryId = 1;
// }

// //

// if (this.previousCategoryId != this.currentCategoryId) {
//   this.thePageNumber = 1;
//   console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)
           
                                                                    
// }
//   // -1 5ater fil back tbada mil 0 w fil font mil 1


// this.productService.getProductListPaginate(this.thePageNumber - 1,
//                                            this.thePageSize,
//                                            this.currentCategoryId)
//                                            .subscribe(this.processsResult()) ;      

// }
// processsResult(){
//   return data => {
//           this.products = data._embedded.products;
//           this.thePageNumber=data.page.number +1;
//           this.thePageSize= data.page.size;
//           this.theTotalElements=data.page.totalElements;

//  };
// /// 



// }


//   ngOnInit(){
//     this.route.paramMap.subscribe(()=>{
//       this.listProducts();
//     });
//   }
 

// }


