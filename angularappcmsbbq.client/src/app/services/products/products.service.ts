import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  api: string = 'https://localhost:44328/api/products';

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.api}`);
  }


  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }


  create(object: Product): Observable<any> {
    return this.http.post<any>(`${this.api}`, object);
  }

  edit(id: string, object: Product): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, object);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
