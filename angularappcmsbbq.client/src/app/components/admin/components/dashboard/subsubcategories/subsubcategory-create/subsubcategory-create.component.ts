import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Category } from '../../../../../../models/category';
import { Subcategory } from '../../../../../../models/subcategory';
import { TaskResult } from '../../../../../../models/taskResult';
import { CategoriesService } from '../../../../../../services/categories/categories.service';
import { SnackBarService } from '../../../../../../services/snack-bar.service';
import { SubcategoriesService } from '../../../../../../services/subcategories/subcategories.service';
import { SubsubcategoriesHandlerService } from '../../../../../../services/subsubcategories/subsubcategories-handler.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-subsubcategory-create',
  templateUrl: './subsubcategory-create.component.html',
  styleUrl: './subsubcategory-create.component.css'
})
export class SubsubcategoryCreateComponent implements OnInit {


  formGroup!: FormGroup;
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  filteredCategories!: Observable<Category[]>;
  subCategoryDisabled = false;


  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    public subsubcategoriesService: SubsubcategoriesHandlerService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {


    this.getAllCategories();


    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      categoryId: ['', [Validators.required]],
      subcategoryId: ['', [Validators.required]]
    });

    this.formGroup.markAllAsTouched();
    this.formGroup.controls['subcategoryId'].disable();
         
  }



  getAllCategories(): void {
    this.categoriesService.getAll().subscribe({
      next: (n: TaskResult<Category[]>) => {
        if (n.success) {
          // pobranie danych
          let data = (n.model as Category[]);
          this.categories = data.sort((a, b) => a.name.localeCompare(b.name)); 

        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      },
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`); 
      }
    });
  }


  getAllSubcategories(categoryId: string): void {
    this.subcategoriesService.getAllByCategoryId(categoryId).subscribe({
      next: (n: TaskResult<Subcategory[]>) => {
        if (n.success) {
          // pobranie danych
          let data = n.model as Subcategory[];
          this.subcategories = data.sort((a, b) => a.name.localeCompare(b.name));

          if (this.subcategories.length > 0) {
            this.formGroup.controls['subcategoryId'].enable();
          } else {
            this.formGroup.controls['subcategoryId'].disable();
          }
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      },
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`); 
      }
    });
  }
   

  onOptionSelectedCategory(event: MatSelectChange): void {
    let category = this.categories.find(f => f.categoryId === event.value);
    if (category != null) {
      this.getAllSubcategories(category.categoryId);
    }
  }
   
   
}
