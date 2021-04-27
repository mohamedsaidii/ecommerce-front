import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
///hedha ili 3malto howa appel lil Rest APIs
export class ProductService {
  private baseUrl ='http://localhost:8080/api/products';

  constructor(private httpClient:HttpClient) { }

  //methode sna3tha traja3li type tableau d'observable 
  //map the json data min spring Data Rest ya3ni bch te5o les données mil requete  
  getProductList(theCategoryId: number): Observable<Product[]> {
    
    
   //need to build URL based on category id 
   const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;  
      return this.httpClient.get<GetResponse>(searchUrl).pipe(
       map(response => response._embedded.products)
     );
  }
}
//bch na9ra json ili feha les informations  mil Spring Data Rest (ya3ni na9rahom mil backend) 
interface GetResponse {
  _embedded:{
    products: Product[];
  }
}
//mohamed