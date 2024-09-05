import { Injectable, ViewChild } from '@angular/core';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../snack-bar.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationUser } from '../../models/applicationUser';
import { FormGroup } from '@angular/forms';
import { TaskResult } from '../../models/taskResult';
import { RegisterViewModel } from '../../models/registerViewModel';
import { GuidGenerator } from '../guid-generator';
import { InfoService } from '../InfoService';
import { ChangePasswordViewModel } from '../../models/changePasswordViewModel';
import { LoginViewModel } from '../../models/loginViewModel';
import { AuthInterceptor } from './auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AccountHandlerService {

  constructor(
    public accountService: AccountService,
    private router: Router,
    private snackBarService: SnackBarService,
  ) {
  } 

  private user!: ApplicationUser;
  public formGroup!: FormGroup;
  public zalogowanyUser!: ApplicationUser;
  public zalogowanyUserEmail: string | undefined = '';
  public roles !: any;
  public role: string = '';
  public logowanie: boolean = false;
  public rejestrowanie: boolean = false;
  public zapisywanie: boolean = false;

    

  // Pobiera użytkownika poprzez email
  public getUserByEmail(email: string): ApplicationUser {

    this.accountService.getUserByEmail(email).subscribe({
      next: ((result: TaskResult<ApplicationUser>) => {
        if (result.success) {

          this.user = result.model as ApplicationUser;            

        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
        }

        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('AccountHandlerService', 'register')}. Name: ${error.name}. Message: ${error.message}`);
      }
    });

    return this.user;
  }

   


  // rejestrowanie nowego użytkownika
  public register(form: FormGroup): void {

    let email = form.controls['emailRegister'].value;
    let password = form.controls['passwordRegister'].value;

    let imie = form.controls['imie'].value;
    let nazwisko = form.controls['nazwisko'].value;
    let ulica = form.controls['ulica'].value;
    let numerUlicy = form.controls['numerUlicy'].value;
    let miejscowosc = form.controls['miejscowosc'].value;
    let kodPocztowy = form.controls['kodPocztowy'].value;
    let kraj = form.controls['kraj'].value;
    let dataUrodzenia = form.controls['dataUrodzenia'].value;
    let telefon = form.controls['telefon'].value;
    let roleName = form.controls['roleName'].value;
     
     
    let registerViewModel: RegisterViewModel = {
      userId: GuidGenerator.newGuid().toString(),

      email: email,
      password: password,

      imie: imie,
      nazwisko: nazwisko,
      ulica: ulica,
      numerUlicy: numerUlicy,
      miejscowosc: miejscowosc,
      kodPocztowy: kodPocztowy,
      kraj: kraj,
      dataUrodzenia: dataUrodzenia.toISOString().split('T')[0],
      telefon: telefon,
      roleName: roleName
    };


    this.rejestrowanie = true;
    this.accountService.register(registerViewModel).subscribe({
      next: ((result: TaskResult<RegisterViewModel>) => {
        if (result.success) {
          this.snackBarService.setSnackBar('Zarejestrowano nowego użytkownika');
          this.rejestrowanie = false;
          form.reset();
        } else {
          this.snackBarService.setSnackBar(`Uzytkownik nie został zarejestrowany. ${result.message}`);
          this.rejestrowanie = false;
        }
        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('AccountHandlerService', 'register')}. Name: ${error.name}. Message: ${error.message}`);
        this.rejestrowanie = false;
      }
    });
  }

   


  // Aktualizowanie konta zalogowanego użytkownika, który jest administratorem
  public updateAccount(ob: ApplicationUser, form: FormGroup): void {

    let email = form.controls['email'].value;
    let imie = form.controls['imie'].value;
    let nazwisko = form.controls['nazwisko'].value;
    let ulica = form.controls['ulica'].value;
    let numerUlicy = form.controls['numerUlicy'].value;
    let miejscowosc = form.controls['miejscowosc'].value;
    let kodPocztowy = form.controls['kodPocztowy'].value;
    let kraj = form.controls['kraj'].value;
    let dataUrodzenia = form.controls['dataUrodzenia'].value;
    let telefon = form.controls['telefon'].value;
    let roleId = form.controls['roleId'].value;

    let user: ApplicationUser = {
      id: ob.id,
      email: email,
      imie: imie,
      nazwisko: nazwisko,
      ulica: ulica,
      numerUlicy: numerUlicy,
      miejscowosc: miejscowosc,
      kodPocztowy: kodPocztowy,
      kraj: kraj,
      dataUrodzenia: dataUrodzenia,
      telefon: telefon,
      roleId: roleId
    };

    this.zapisywanie = true;
    this.accountService.updateAccount(user).subscribe({
      next: ((result: TaskResult<ApplicationUser>) => {
        if (result.success) {
          this.snackBarService.setSnackBar(`Konto zostało zaktualizowane`);
          //this.router.navigate(['/users']);
          this.logowanie = false;
          this.zapisywanie = false;
        } else {
          this.snackBarService.setSnackBar(`${result.message}`);
          sessionStorage.removeItem('userToken');
          this.zapisywanie = false;
        }

        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('AccountHandlerService', 'updateAccount')}. Name: ${error.name}. Message: ${error.message}`);
        this.zapisywanie = false;
      }
    });
  }


   



  public login(form: FormGroup): void {

    // Pobranie wartości z kontrolek
    let email = form.controls['emailLogin'].value;
    let password = form.controls['passwordLogin'].value;


    // Przekazanie obiektu logowania do metody 
    let loginViewModel: LoginViewModel = {
      email: email,
      password: password,
      token: '',
      role: ''
    };

    this.logowanie = true;
    this.accountService.login(loginViewModel).subscribe({
      next: ((result: TaskResult<LoginViewModel>) => {

        if (result.success) {

          let data = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

          // zapisanie w sesji zalogowanego użytkownika
          let sessionModel = {
            model: result.model as LoginViewModel,
            isLoggedIn: true,
            role: result.model.role,
            startTime: data
          };
          sessionStorage.setItem('sessionModel', JSON.stringify(sessionModel));

          this.snackBarService.setSnackBar(`Zalogowany użytkownik: ${result.model.email}`);
          //this.zalogowanyUserEmail = result.model.email;
          this.isLoggedIn = true;
          this.logowanie = false;
          this.role = result.model.role ? result.model.role : "";


          //this.authInterceptor.startSessionTimer();

          form.reset();
          this.router.navigate(['admin/users']);
        } else {
          this.snackBarService.setSnackBar(`${InfoService.info('Dashboard', 'login')}. ${result.message}.`);
          sessionStorage.removeItem('sessionModel');
          this.isLoggedIn = false;
          this.logowanie = false;
          form.reset();
        }
        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('Dashboard', 'login')}. Name: ${error.name}. Message: ${error.message}`);
        sessionStorage.removeItem('sessionModel');
        this.logowanie = false;
      }
    });
  }



  // Metoda odpowiedzialna za wylogowanie
  public wyloguj(): void {

    sessionStorage.removeItem('sessionModel');
    this.isLoggedIn = false;
    this.router.navigate(['/']);

    this.accountService.logout().subscribe({
      next: () => { 
        // Wyczyszczenie danych z pamięci podręcznej
        sessionStorage.removeItem('sessionModel');
        this.isLoggedIn = false;
        this.router.navigate(['/']); 
      },
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('AccountHandlerService', 'wyloguj')}. Name: ${error.name}. Message: ${error.message}`);
      }
    });
  }




  public isLoggedIn: boolean = false;
  public isLoggedInInterceptor(): boolean {
    const sessionModel = sessionStorage.getItem('sessionModel');
    if (sessionModel) {
      //this.isLoggedIn = true;
      const sm = JSON.parse(sessionModel);

      // pobranie pierwszej roli użytkownika 
      this.role = sm.role;


      return true;
    } else {
      const sessionModel = sessionStorage.getItem('sessionModel') || '';
      if (sessionModel) {
        let sm = JSON.parse(sessionModel);
        sm.isLoggedIn = false;
      }
      return false;
    }
  }



  public changePassword(form: FormGroup): void {

    // pobranie danych użytkownika z sesji
    const sessionModel = sessionStorage.getItem('sessionModel') || '';
    if (sessionModel) {
      let sm = JSON.parse(sessionModel);
      let email = sm.model.email;

      if (email.length > 0) {
        let changePasswordViewModel: ChangePasswordViewModel = {
          email: email,
          oldPassword: form.controls['oldPassword'].value,
          newPassword: form.controls['newPassword'].value
        };

        this.zapisywanie = true;
        this.accountService.changePassword(changePasswordViewModel).subscribe({
          next: ((result: TaskResult<ChangePasswordViewModel>) => {
            if (result.success) {
              this.snackBarService.setSnackBar(`Hasło zostało poprawnie zmienione`);
              form.reset();
              this.zapisywanie = false;
            } else {
              this.snackBarService.setSnackBar(`Hasło nie zostało zmienione. ${result.message}`);
              form.reset();
              this.zapisywanie = false;
            }
            return result;
          }),
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('AccountHandlerService', 'changePassword')}. Name: ${error.name}. Message: ${error.message}`);
            this.zapisywanie = false;
          }
        });
      }
    }
  }


  getUserRole: string = '';
  getUserRoles(): void {
    /*this.accountService.getUserRoles(this.zalogowanyUserEmail).subscribe((n: TaskResult<string[]>) => {
      if (n.success) {
        // pobiera wszystkie role użytkownika
        this.roles = n.model;
        if (n.model.length > 0) {
          // pobiera pierwszą rolę użytkownika
          this.getUserRole = n.model[0];
          alert(n.model);
        }
      }
    });*/
  }

  /*
    uInRole: boolean = false;
    userInRole(roleName: string): boolean {
      this.accountService.userInRole(this.zalogowanyUserEmail, roleName).subscribe((n: TaskResult<boolean>) => {
        this.uInRole = n.success;
      });
      return this.uInRole;
    }
  */




  /*public searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/





  public asTouchedDirtyLogin(form: FormGroup): boolean {
    if (
      form.controls['emailLogin'].valid &&
      form.controls['passwordLogin'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  public asTouchedDirtyRegister(form: FormGroup): boolean {
    if (
      form.controls['emailRegister'].valid &&
      form.controls['passwordRegister'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }




  public isValidCreate(form: FormGroup): boolean {
    if (
      form.controls['emailRegister'].touched && form.controls['emailRegister'].dirty && form.controls['emailRegister'].valid &&
      form.controls['passwordRegister'].touched && form.controls['passwordRegister'].dirty && form.controls['passwordRegister'].valid &&
      form.controls['imie'].touched && form.controls['imie'].dirty && form.controls['imie'].valid &&
      form.controls['nazwisko'].touched && form.controls['nazwisko'].dirty && form.controls['nazwisko'].valid &&
      form.controls['ulica'].touched && form.controls['ulica'].dirty && form.controls['ulica'].valid &&
      form.controls['numerUlicy'].touched && form.controls['numerUlicy'].dirty && form.controls['numerUlicy'].valid &&
      form.controls['miejscowosc'].touched && form.controls['miejscowosc'].dirty && form.controls['miejscowosc'].valid &&
      form.controls['kodPocztowy'].touched && form.controls['kodPocztowy'].dirty && form.controls['kodPocztowy'].valid &&
      form.controls['kraj'].touched && form.controls['kraj'].dirty && form.controls['kraj'].valid &&
      form.controls['dataUrodzenia'].touched && form.controls['dataUrodzenia'].dirty && form.controls['dataUrodzenia'].valid &&
      form.controls['telefon'].touched && form.controls['telefon'].dirty && form.controls['telefon'].valid &&
      form.controls['roleName'].touched && form.controls['roleName'].dirty && form.controls['roleName'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  public isValidCreateUser(form: FormGroup): boolean {
    if (
      form.controls['emailRegister'].touched && form.controls['emailRegister'].dirty && form.controls['emailRegister'].valid &&
      form.controls['passwordRegister'].touched && form.controls['passwordRegister'].dirty && form.controls['passwordRegister'].valid &&
      form.controls['imie'].touched && form.controls['imie'].dirty && form.controls['imie'].valid &&
      form.controls['nazwisko'].touched && form.controls['nazwisko'].dirty && form.controls['nazwisko'].valid &&
      form.controls['ulica'].touched && form.controls['ulica'].dirty && form.controls['ulica'].valid &&
      form.controls['numerUlicy'].touched && form.controls['numerUlicy'].dirty && form.controls['numerUlicy'].valid &&
      form.controls['miejscowosc'].touched && form.controls['miejscowosc'].dirty && form.controls['miejscowosc'].valid &&
      form.controls['kodPocztowy'].touched && form.controls['kodPocztowy'].dirty && form.controls['kodPocztowy'].valid &&
      form.controls['kraj'].touched && form.controls['kraj'].dirty && form.controls['kraj'].valid &&
      form.controls['dataUrodzenia'].touched && form.controls['dataUrodzenia'].dirty && form.controls['dataUrodzenia'].valid &&
      form.controls['telefon'].touched && form.controls['telefon'].dirty && form.controls['telefon'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  public isValidEdit(form: FormGroup): boolean {
    if (
      form.controls['imie'].valid &&
      form.controls['nazwisko'].valid &&
      form.controls['telefon'].valid &&
      form.controls['ulica'].valid &&
      form.controls['numerUlicy'].valid &&
      form.controls['miejscowosc'].valid &&
      form.controls['kraj'].valid &&
      form.controls['kodPocztowy'].valid &&
      form.controls['dataUrodzenia'].valid &&
      form.controls['roleId'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }



  public isValidUpdate(form: FormGroup): boolean {
    if (
      form.controls['imie'].valid &&
      form.controls['nazwisko'].valid &&
      form.controls['telefon'].valid &&
      form.controls['ulica'].valid &&
      form.controls['numerUlicy'].valid &&
      form.controls['miejscowosc'].valid &&
      form.controls['kodPocztowy'].valid &&
      form.controls['kraj'].valid &&
      form.controls['dataUrodzenia'].valid &&
      form.controls['roleId'].valid 
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  public isValidChangePassword(form: FormGroup): boolean {
    if (
      form.controls['oldPassword'].touched && form.controls['oldPassword'].dirty && form.controls['oldPassword'].valid &&
      form.controls['newPassword'].touched && form.controls['newPassword'].dirty && form.controls['newPassword'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }




}
