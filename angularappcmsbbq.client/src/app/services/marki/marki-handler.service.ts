import { Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Marka } from '../../models/marka';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MarkiService } from './marki.service';
import { SnackBarService } from '../snack-bar.service';
import { TaskResult } from '../../models/taskResult';
import { FormGroup } from '@angular/forms';
import { GuidGenerator } from '../guid-generator';
import { InfoService } from '../InfoService';

@Injectable({
  providedIn: 'root'
})
export class MarkiHandlerService {

  displayedColumns: string[] = ['lp', 'name', 'action'];
  dataSource = new MatTableDataSource<Marka>();

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  marka!: Marka;
  marki: Marka[] = [];
  loadingElements: boolean = false;


  constructor(
    private markiService: MarkiService,
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
    this.markiService.getAll().subscribe({
      next: (n: TaskResult<Marka[]>) => {
        if (n.success) {
          // pobranie danych
          this.marki = n.model;
          this.dataSource.data = n.model;
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      },
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('MarkiHandlerService', 'getAll')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }



  public get(id: any): Marka {
    this.markiService.get(id).subscribe({
      next: ((n: TaskResult<Marka>) => {
        if (n.success) {
          // pobranie danych
          this.marka = n.model as Marka;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('MarkiHandlerService', 'get')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
    return this.marka;
  }



  public create(form: FormGroup): void {

    let marka: Marka = {
      markaId: GuidGenerator.newGuid().toString(),
      name: form.controls['name'].value
    };

    this.loadingElements = true;
    this.markiService.create(marka).subscribe({
      next: (s: TaskResult<Marka>) => {
        if (s.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Nowa pozycja została dodana');
          this.loadingElements = false;
          form.reset();
          form.markAllAsTouched();
        } else {
          this.snackBarService.setSnackBar(s.message);
          this.loadingElements = false;
        }
        return s;
      },
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('MarkiHandlerService', 'create')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });

  }





  public edit(id: string, form: FormGroup): void {

    let marka: Marka = {
      markaId: id,
      name: form.controls['name'].value,
    };

    this.loadingElements = true;
    this.markiService.edit(id, marka).subscribe({
      next: (s: TaskResult<Marka>) => {
        if (s.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Nowa pozycja została zaktualizowana');
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(s.message);
          this.loadingElements = false;
        }
        return s;
      },
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('MarkiHandlerService', 'edit')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }





  public delete(id: string): void {
    this.loadingElements = true;
    this.markiService.delete(id).subscribe({
      next: (s: TaskResult<Marka>) => {
        if (s.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Pozycja zostsała usunięta');
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(s.message);
          this.loadingElements = false;
        }
        return s;
      },
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('MarkiHandlerService', 'delete')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });

  }





  public searchFilter(event: Event) {
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
      form.controls['name'].touched && form.controls['name'].dirty && form.controls['name'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  public isValidEdit(form: FormGroup): boolean {
    if (
      form.controls['name'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }



}

