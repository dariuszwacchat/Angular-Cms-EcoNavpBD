import { Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../models/category';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriesService } from './categories.service';
import { SnackBarService } from '../snack-bar.service';
import { TaskResult } from '../../models/taskResult';
import { FormGroup } from '@angular/forms';
import { GuidGenerator } from '../guid-generator';
import { InfoService } from '../InfoService';

@Injectable({
  providedIn: 'root'
})
export class CategoriesHandlerService {

  displayedColumns: string[] = ['lp', 'name', 'fullName', 'action'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;


  category!: Category;
  categories: Category[] = [];
  loadingElements: boolean = false; 

  constructor(
    private categoriesService: CategoriesService,
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
    this.categoriesService.getAll().subscribe({
      next: ((result: TaskResult<Category[]>) => {
        if (result.success) {
          // pobranie danych
          this.categories = result.model as Category[];
          this.dataSource.data = result.model as Category[];
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
        }
        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('CategoriesHandlerService', 'getAll')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });
  } 



  public get(id: string): Category { 
    this.categoriesService.get(id).subscribe({
      next: ((result: TaskResult<Category>) => {
        if (result.success) {
          // pobranie danych
          this.category = result.model as Category;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
        }
        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('CategoriesHandlerService', 'get')}. Name: ${error.name}. Message: ${error.message}`);
      }
    });
    return this.category;
  }






  public create(form: FormGroup): void {

    let category: Category = {
      categoryId: GuidGenerator.newGuid().toString(),
      name: form.controls['name'].value,
      fullName: form.controls['fullName'].value,
      iloscOdwiedzin: 0
    };

    this.loadingElements = true;
    this.categoriesService.create(category).subscribe({
      next: ((result: TaskResult<Category>) => {
        if (result.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Nowa pozycja została dodana');
          this.loadingElements = false;
          form.reset();
          form.markAllAsTouched();
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
          this.loadingElements = false;
        }
        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('CategoriesHandlerService', 'create')}. Name: ${error.name}. Message: ${error.message}`);
        this.loadingElements = false;
      }
    });

  }





  public edit(ob: Category, form: FormGroup): void {

    if (ob) {

      let category: Category = {
        categoryId: ob.categoryId.toString(),
        name: form.controls['name'].value,
        fullName: form.controls['fullName'].value,
        iloscOdwiedzin: 0
      };


      this.loadingElements = true;
      this.categoriesService.edit(ob.categoryId, category).subscribe({
        next: ((result: TaskResult<Category>) => {
          if (result.success) {
            this.getAll();
            this.snackBarService.setSnackBar('Nowa pozycja została zaktualizowana');
            this.loadingElements = false;
          } else {
            this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
            this.loadingElements = false;
          }
          return result;
        }),
        error: (error: Error) => {
          this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('CategoriesHandlerService', 'edit')}. Name: ${error.name}. Message: ${error.message}`);
          this.loadingElements = false;
        }
      });
    }

  }





  public delete(id: string): void {
    this.loadingElements = true;
    this.categoriesService.delete(id).subscribe({
      next: ((result: TaskResult<Category>) => {
        if (result.success) {
          this.getAll();
          this.snackBarService.setSnackBar('Pozycja zostsała usunięta');
          this.loadingElements = false;
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
          this.loadingElements = false;
        }
        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('CategoriesHandlerService', 'delete')}. Name: ${error.name}. Message: ${error.message}`);
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
      form.controls['name'].touched && form.controls['name'].dirty && form.controls['name'].valid &&
      form.controls['fullName'].touched && form.controls['fullName'].dirty && form.controls['fullName'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  public isValidEdit(form: FormGroup): boolean {
    if (
      form.controls['name'].valid &&
      form.controls['fullName'].valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }


}
