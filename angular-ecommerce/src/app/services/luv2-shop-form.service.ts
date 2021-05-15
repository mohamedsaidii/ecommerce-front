import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import{ Observable } from 'rxjs';
import{ of } from 'rxjs'; //pour envelopper data en observable 
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {
  private countrieUrl = 'http://localhost:8080/api/countries';
  private statesUrl ='http://localhost:8080/api/states';
  

  constructor(private httpClient: HttpClient) { }


  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countrieUrl).pipe(
      map(response => response._embedded.countries)  
    );
  }
  getStates(theCountryCode:string): Observable<State[]> {
    //search url
    const  searchstateUrl=`${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`

    return this.httpClient.get<GetResponseStates>(searchstateUrl).pipe(
      map(response => response._embedded.states)  
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data:  number[] = [];
    // build an array for "Month dropdown list"
    //-start at desired startMonth andloop until 12

    //
    for (let theMonth = startMonth; theMonth <= 12; theMonth++)
    {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears():Observable<number[]> {
    let data: number[] =[];
    const startYear: number= new Date().getFullYear();
    const endYear: number= startYear+10;
    for(let theYear = startYear;theYear<=endYear;theYear++)
    {
      data.push(theYear);
    }
    return of(data);
  }
}
interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}
interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}