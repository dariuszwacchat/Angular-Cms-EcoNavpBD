import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountHandlerService } from '../../../../services/account/account-handler.service';
import { RolesHandlerService } from '../../../../services/roles/roles-handler.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { AccountService } from '../../../../services/account/account.service';
import { LoginViewModel } from '../../../../models/loginViewModel';
import { TaskResult } from '../../../../models/taskResult';
import { InfoService } from '../../../../services/InfoService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  formGroupLogin !: FormGroup;
  formGroupRegister !: FormGroup;
  navigation!: any;
  isSidenavOpen = false;
  password: string = 'SDG%$@5423sdgagSDert';

  //zalogowanyUserEmail: string | undefined = '';
  role: string = '';
  logowanie: boolean = false;
  isLoggedIn: boolean = false;


  constructor(
    private fb: FormBuilder,
    public accountHandlerService: AccountHandlerService,
    public roleService: RolesHandlerService,
    private router: Router,
    private snackBarService: SnackBarService,
    public accountService: AccountService,
  ) { }


  ngOnInit(): void {

    // formularz logowania
    this.formGroupLogin = this.fb.group({
      emailLogin: ['admin@admin.pl', [Validators.required]],
      passwordLogin: ['SDG%$@5423sdgagSDert', [Validators.required]]
    });


    // formularz rejestracji
    this.formGroupRegister = this.fb.group({
      emailRegister: ['', [Validators.required, Validators.email]],
      passwordRegister: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/]).{8,}$/)]],
      imie: ['', [Validators.required]],
      nazwisko: ['', [Validators.required]],
      ulica: ['', [Validators.required]],
      numerUlicy: ['', [Validators.required]],
      miejscowosc: ['', [Validators.required]],
      kraj: ['', [Validators.required]],
      kodPocztowy: ['', [Validators.required]],
      dataUrodzenia: ['', [Validators.required]],
      telefon: ['', [Validators.required]],
    });

    this.formGroupLogin.markAllAsTouched();
    this.formGroupRegister.markAllAsTouched();


    let sessionModel = sessionStorage.getItem('sessionModel') || '';
    let sm = JSON.parse(sessionModel);
    //this.zalogowanyUserEmail = sm.model.email;
    this.isLoggedIn = sm.isLoggedIn;
    this.role = sm.role;

  }


  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }


  linkName: string = '\\';
  getLinkName(linkName: string): void {
    this.linkName = `\\${linkName}`;
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

          // czas po jakim użytkownik ma się wylogować w milisekundach, minuta to 60000 ms, 10 * 60 * 10 = 60000
          // let expirationTime = 10000; // 10 sek
          // let expirationTime = 60000; // 1 min
          let expirationTime = 600000; // 10 min
          let dataZalogowania = new Date();
          let dataWylogowania = dataZalogowania.setMilliseconds(expirationTime)
         
          // zapisanie w sesji zalogowanego użytkownika
          let sessionModel = {
            model: result.model as LoginViewModel,
            isLoggedIn: true,
            role: result.model.role,
            dataZalogowania: dataZalogowania,
            dataWylogowania: dataWylogowania,
            expirationTime: expirationTime,
          };             
          sessionStorage.setItem('sessionModel', JSON.stringify(sessionModel));

          this.snackBarService.setSnackBar(`Zalogowany użytkownik: ${result.model.email}`);
          //this.zalogowanyUserEmail = result.model.email;
          this.isLoggedIn = true;
          this.logowanie = false;
          this.role = result.model.role ? result.model.role : "";

          
          form.reset();
          //this.router.navigate(['admin/users']);
          this.router.navigate(['admin/users']).then(() => location.reload());
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



/*
  // Metoda odpowiedzialna za wylogowanie
  public wyloguj(): void {    
    this.accountService.logout().subscribe({
      next: () => {
        // Wyczyszczenie danych z pamięci podręcznej
        sessionStorage.removeItem('sessionModel');
        //this.isLoggedIn = false;
        //this.router.navigate(['admin/users']);
        this.router.navigate(['admin']).then(() => location.reload());
      },
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('DashboardComponent', 'wyloguj')}. Name: ${error.name}. Message: ${error.message}`);
      }
    });
  }
*/


}
