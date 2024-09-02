import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AccountHandlerService } from '../../../../../services/account/account-handler.service';
import { CategoriesHandlerService } from '../../../../../services/categories/categories-handler.service';
import { SubcategoriesHandlerService } from '../../../../../services/subcategories/subcategories-handler.service';
import { SubsubcategoriesHandlerService } from '../../../../../services/subsubcategories/subsubcategories-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { Subcategory } from '../../../../../models/subcategory';
import { SubcategoryDeleteComponent } from './subcategory-delete/subcategory-delete.component';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css'
})
export class SubcategoriesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public accountService: AccountHandlerService,
    public categoriesService: CategoriesHandlerService,
    public subcategoriesService: SubcategoriesHandlerService,
    public subsubcategoriesService: SubsubcategoriesHandlerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.subcategoriesService.initializeDataSource(this.paginator, this.sort);
  }



  openDialogDelete(subcategory: Subcategory): void {
    let openRef = this.dialog.open(SubcategoryDeleteComponent, {
      data: subcategory
    });
    openRef.afterClosed().subscribe();
  }

}
