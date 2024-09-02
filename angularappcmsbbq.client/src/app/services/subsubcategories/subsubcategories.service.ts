import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subsubcategory } from '../../models/subsubcategory';

@Injectable({
  providedIn: 'root'
})
export class SubsubcategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  api: string = 'https://localhost:44328/api/subsubcategories';


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.api}`);
  } 

  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }


  getAllByCategoryIdAndSubcategoryId(categoryId: string, subcategoryId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/getAllByCategoryIdAndSubcategoryId/${categoryId}/${subcategoryId}`);
  }

  create(object: Subsubcategory): Observable<any> {
    return this.http.post<any>(`${this.api}`, object);
  }

  edit(id: string, object: Subsubcategory): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, object);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }

}
