import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-gride.component.html',
 // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  currentCategoryId :number;
  constructor(private productService:ProductService,
              private route:ActivatedRoute ) { }


  listProducts(){
    //check "id" parametre is available 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId)
    {
       //recuperer id et convertir en entier a l'aide de symbole +
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    }
    else{
      //not category id available ...... default to category id 1
      this.currentCategoryId = 1;
    }


    this.productService.getProductList(this.currentCategoryId).subscribe(
      //Assign results to the Product  array
      data => {
        this.products = data;
      }
    )
  }
  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

}
