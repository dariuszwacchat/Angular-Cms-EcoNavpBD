import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AccountHandlerService } from '../../../../../services/account/account-handler.service';
import { CategoriesHandlerService } from '../../../../../services/categories/categories-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../../../../models/category';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    public accountService: AccountHandlerService,
    public categoriesService: CategoriesHandlerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.categoriesService.initializeDataSource(this.paginator, this.sort);
  }




  getText(text: string, iloscZnakow: number): string {
    if (text.length > iloscZnakow) {
      return `${text.substring(0, iloscZnakow)}...`;
    } else {
      return text;
    }
  }
  

  openDialogDelete(category: Category): void {
    let openRef = this.dialog.open(CategoryDeleteComponent, {
      data: category
    });
    openRef.afterClosed().subscribe();
  }


  currentPageIndex: number = 0;
  pageSize: number = 5;
  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }

  getIndex(index: number): number {
    return this.currentPageIndex * this.pageSize + index + 1;
  }

}
