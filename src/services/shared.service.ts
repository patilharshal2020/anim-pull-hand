import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getCategoriesList(){
    return this.http.get('https://dummyjson.com/products/category-list');
  }
}

