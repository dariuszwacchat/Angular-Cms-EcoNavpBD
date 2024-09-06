import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { AccountHandlerService } from './account-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountServiceHandler: AccountHandlerService,
    private router: Router
  ) { }

  private hasRole: boolean = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRoles = route.data['expectedRoles'] as Array<string>;

    let sessionModel = sessionStorage.getItem('sessionModel');
    if (sessionModel) {
      let sm = JSON.parse(sessionModel); 
      let role = sm.role;

      // Sprawdź, czy użytkownik jest zalogowany i ma odpowiednią rolę
      if (this.accountServiceHandler.isLoggedInInterceptor() && expectedRoles.includes(role)) {
        return true;
      }
    }

    // Przekieruj użytkownika do strony głównej, jeśli nie ma uprawnień
    this.router.navigate(['admin/dashboard']);
    return false;
  }

}
