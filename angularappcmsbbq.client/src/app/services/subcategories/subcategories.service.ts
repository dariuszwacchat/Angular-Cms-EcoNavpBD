import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  api: string = 'https://localhost:44328/api/subcategories';


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.api}`);
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }


  getAllByCategoryId(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/getAllByCategoryId/${categoryId}`);
  }

  create(object: Subcategory): Observable<any> {
    return this.http.post<any>(`${this.api}`, object);
  }

  edit(id: string, object: Subcategory): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, object);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
