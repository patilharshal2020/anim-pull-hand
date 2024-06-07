import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedCategorySubject: BehaviorSubject<string> = new BehaviorSubject<string>('Beauty');
  private productsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  selectedCategory$: Observable<string> = this.selectedCategorySubject.asObservable();
  productsByCategory$: Observable<any> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.selectedCategory$.pipe(
      switchMap(category => this.getProductsByCategory(category))
    ).subscribe(products => this.productsSubject.next(products));
  }

  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }

  getCategoriesList() {
    return this.http.get('https://dummyjson.com/products/category-list');
  }

  private getProductsByCategory(cat: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/category/${cat}`);
  }
}


