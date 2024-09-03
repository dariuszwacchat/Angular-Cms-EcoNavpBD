import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUser } from '../../models/applicationUser';
import { ChangePasswordViewModel } from '../../models/changePasswordViewModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  api: string = 'https://localhost:44328/api/account';


  /*getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.api}/getUsers`);
  }*/


  /*getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/getUserById/${userId}`);
  }*/


  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.api}/getUserByEmail/${email}`);
  }

  register(model: any): Observable<any> {
    return this.http.post<any>(`${this.api}/register`, model);
  }

  login(model: any): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, model);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.api}/logout`, null);
  }

  updateAccount(user: ApplicationUser): Observable<any> {
    return this.http.post<any>(`${this.api}/updateAccount`, user);
  }

  deleteAccountByUserId(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/deleteAccountByUserId/${userId}`);
  }

  changePassword(user: ChangePasswordViewModel): Observable<any> {
    return this.http.post<any>(`${this.api}/changePassword`, user);
  }

  getUserRoles(email: string): Observable<any> {
    return this.http.get<any>(`${this.api}/getUserRoles/${email}`);
  }

  userInRole(email: string, roleName: string): Observable<any> {
    return this.http.get<any>(`${this.api}/userInRole/${email}/${roleName}`);
  }

}
