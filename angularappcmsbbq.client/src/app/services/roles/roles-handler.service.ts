import { Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationRole } from '../../models/applicationRole';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RolesService } from './roles.service';
import { SnackBarService } from '../snack-bar.service';
import { TaskResult } from '../../models/taskResult';
import { FormGroup } from '@angular/forms';
import { GuidGenerator } from '../guid-generator';
import { InfoService } from '../InfoService';

@Injectable({
  providedIn: 'root'
})
export class RolesHandlerService {

  displayedColumns: string[] = ['lp', 'name', 'action'];
  dataSource = new MatTableDataSource<ApplicationRole>();

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  private rolesMap: Map<string, string> = new Map<string, string>();

  roles: ApplicationRole[] = [];
  loadingElements: boolean = false;


  constructor(
    private rolesService: RolesService,
    private snackBarService: SnackBarService
  ) {
    this.getAll();
  }




  public initializeDataSource(paginator: MatPaginator, sort: MatSort): void {
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
    this.getAll();
  }
   

  public getAll(): void {
    this.loadingElements = true;
    this.rolesService.getAll().subscribe({
      next: ((n: TaskResult<ApplicationRole[]>) => {
        if (n.success) {
          // pobranie danych
          this.dataSource.data = n.model;
          this.roles = n.model;

          n.model.forEach((f: ApplicationRole) => {
            this.rolesMap.set(f.id, f.name);
          });

          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RolesHandlerService', 'getAll')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }



  public getRoleName(roleId: string): string {
    return this.rolesMap.get(roleId) || '';
  }

   



  public create(form: FormGroup): void {

    let role: ApplicationRole = {
      id: GuidGenerator.newGuid().toString(),
      name: form.controls['name'].value
    };

    this.loadingElements = true;
    this.rolesService.create(role).subscribe({
      next: ((n: TaskResult<ApplicationRole>) => {
        if (n.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Nowa pozycja została dodana');
          this.loadingElements = false;
          form.reset();
          form.markAllAsTouched();
        } else {
          this.snackBarService.setSnackBar(n.message);
          this.loadingElements = false;
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RolesHandlerService', 'create')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });

  }





  public edit(ob: ApplicationRole, form: FormGroup): void {

    if (ob) {

      let role: ApplicationRole = {
        id: ob.id.toString(),
        name: form.controls['name'].value,
      };

      this.loadingElements = true;
      this.rolesService.edit(ob.id, role).subscribe({
        next: ((s: TaskResult<ApplicationRole>) => {
          if (s.success) {
            this.getAll();
            this.snackBarService.setSnackBar('Nowa pozycja została zaktualizowana');
            this.loadingElements = false;
          } else {
            this.snackBarService.setSnackBar(s.message);
            this.loadingElements = false;
          }
          return s;
        }),
        error: (error: Error) => {
          this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RolesHandlerService', 'edit')}. Name: ${error.name}. Message: ${error.message}`);
          this.loadingElements = false;
        }
      });
    }

  }





  public delete(id: string): void {
    this.loadingElements = true;
    this.rolesService.delete(id).subscribe({
      next: ((s: TaskResult<ApplicationRole>) => {
        if (s.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Pozycja zostsała usunięta');
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(s.message);
          this.loadingElements = false;
        }
        return s;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RolesHandlerService', 'delete')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }





  searchFilter(event: Event) {
    this.loadingElements = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.loadingElements = false;
  }






  public isValidCreate(form: FormGroup): boolean {
    if (
      form.controls['name'].touched && form.controls['name'].dirty && form.valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  public isValidEdit(form: FormGroup): boolean {
    if (
      form.valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }
}
