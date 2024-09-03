import { Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RejestratorLogowania } from '../../models/rejestratorLogowania';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RejestratorLogowaniaService } from './rejestrator-logowania.service';
import { SnackBarService } from '../snack-bar.service';
import { TaskResult } from '../../models/taskResult';
import { FormGroup } from '@angular/forms';
import { InfoService } from '../InfoService';

@Injectable({
  providedIn: 'root'
})
export class RejestratorLogowaniaHandlerService {

  displayedColumns: string[] = ['lp', 'dataZalogowania', 'dataWylogowania', 'userId', 'action'];
  dataSource = new MatTableDataSource<RejestratorLogowania>();

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;


  rejestratorLogowania!: RejestratorLogowania;
  rejestratorLogowan: RejestratorLogowania[] = [];
  loadingElements: boolean = false;

  constructor(
    private rejestratorLogowaniaService: RejestratorLogowaniaService,
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
    this.rejestratorLogowaniaService.getAll().subscribe({
      next: ((n: TaskResult<RejestratorLogowania[]>) => {
        if (n.success) {
          // pobranie danych
          this.dataSource.data = n.model as RejestratorLogowania[];
          this.rejestratorLogowan = n.model as RejestratorLogowania [];
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RejestratorLogowaniaHandlerService', 'getAll')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }



  public get(id: any): void {
    this.loadingElements = true;
    this.rejestratorLogowaniaService.get(id).subscribe({
      next: ((n: TaskResult<RejestratorLogowania>) => {
        if (n.success) {
          // pobranie danych
          this.rejestratorLogowania = n.model as RejestratorLogowania;
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
          this.loadingElements = false;
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RejestratorLogowaniaHandlerService', 'get')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }

   


  public edit(id: string, form: FormGroup): void {

    let marka: RejestratorLogowania = {
      rejestratorLogowaniaId: id,
      dataZalogowania: form.controls['dataZalogowania'].value,
      dataWylogowania: form.controls['dataWylogowania'].value,
      userId: ''
    };

    this.loadingElements = true;
    this.rejestratorLogowaniaService.edit(id, marka).subscribe({
      next: ((n: TaskResult<RejestratorLogowania>) => {
        if (n.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Nowa pozycja została zaktualizowana');
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(n.message);
          this.loadingElements = false;
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RejestratorLogowaniaHandlerService', 'edit')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  }





  public delete(id: string): void {
    this.loadingElements = true;
    this.rejestratorLogowaniaService.delete(id).subscribe({
      next: ((n: TaskResult<RejestratorLogowania>) => {
        if (n.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Pozycja zostsała usunięta');
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(n.message);
          this.loadingElements = false;
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RejestratorLogowaniaHandlerService', 'delete')}. Name: ${error.name}. Message: ${error.message}`);
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



 


  /*public isValidCreate(form: FormGroup): boolean {
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
  }*/



}

