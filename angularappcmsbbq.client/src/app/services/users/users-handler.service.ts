import { Injectable, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../snack-bar.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationUser } from '../../models/applicationUser';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { TaskResult } from '../../models/taskResult';
import { GuidGenerator } from '../guid-generator';
import { RegisterViewModel } from '../../models/registerViewModel';
import { InfoService } from '../InfoService';

@Injectable({
  providedIn: 'root'
})
export class UsersHandlerService {

  constructor(
    public usersService: UsersService,
    private snackBarService: SnackBarService
  ) {
  }

  displayedColumns: string[] = ['lp', 'imie', 'nazwisko', 'telefon', 'email', 'roleId', 'action'];
  dataSource = new MatTableDataSource<ApplicationUser>();

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  user!: ApplicationUser;
  users: ApplicationUser[] = [];
  formGroup!: FormGroup;
  loadingElements: boolean = false;



  public initializeDataSource(paginator: MatPaginator, sort: MatSort): void {
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.getAll();
  }


  // Pobiera wszystkich użytkowników z bazy
  public getAll(): void {
    this.loadingElements = true;
    this.usersService.getAll().subscribe({
      next: ((n: TaskResult<ApplicationUser[]>) => {
        if (n.success) {
          // pobranie danych
          this.dataSource.data = n.model as ApplicationUser[];
          this.users = n.model as ApplicationUser[];
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('UsersHandlerService', 'getAll')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }

   
  public getUserByEmail(email: string): ApplicationUser {
    this.loadingElements = true;
    this.usersService.getUserByEmail(email).subscribe({
      next: ((n: TaskResult<ApplicationUser>) => {
        if (n.success) {
          this.user = n.model as ApplicationUser;
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`Użytkownik nie został załadowany. ${n.message}`);
          this.loadingElements = false;
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('UsersHandlerService', 'getUserByEmail')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });

    return this.user;
  }




  public create (form: FormGroup): void {

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


    this.loadingElements = true;
    this.usersService.create (registerViewModel).subscribe({
      next: ((n: TaskResult<RegisterViewModel>) => {
        if (n.success) {
          this.snackBarService.setSnackBar('Zarejestrowano nowego użytkownika');
          this.loadingElements = false;
          form.reset();
          form.markAllAsTouched();
        } else {
          this.snackBarService.setSnackBar(`Uzytkownik nie został zarejestrowany. ${n.message}`);
          this.loadingElements = false;
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('UsersHandlerService', 'create')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    }); 
  }
    


  public edit (id: string, form: FormGroup): void {

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
      id: id,
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

    this.loadingElements = true;
    this.usersService.edit(id, user).subscribe({
      next: ((n: TaskResult<ApplicationUser>) => {
        if (n.success) {
          this.snackBarService.setSnackBar(`Konto zostało zaktualizowane`);
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`${n.message}`);
          sessionStorage.removeItem('userToken');
          this.loadingElements = false;
        }

        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('UsersHandlerService', 'edit')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }






  public delete(id: string): void {
    this.loadingElements = true;
    this.usersService.delete(id).subscribe({
      next: ((n: TaskResult<boolean>) => {
        if (n.success) {
          this.getAll ();
          this.snackBarService.setSnackBar(`Usunięto`);
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`${n.message}`);
          this.loadingElements = false;
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('UsersHandlerService', 'delete')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }

  
   
   

  public searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
    


}
