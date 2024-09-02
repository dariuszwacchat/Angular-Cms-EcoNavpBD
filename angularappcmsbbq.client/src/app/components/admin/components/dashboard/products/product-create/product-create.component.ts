import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkiService } from '../../../../../../services/marki/marki.service';
import { CategoriesService } from '../../../../../../services/categories/categories.service';
import { SubcategoriesService } from '../../../../../../services/subcategories/subcategories.service';
import { SubsubcategoriesService } from '../../../../../../services/subsubcategories/subsubcategories.service';
import { ProductsHandlerService } from '../../../../../../services/products/products-handler.service';
import { TaskResult } from '../../../../../../models/taskResult';
import { Marka } from '../../../../../../models/marka';
import { Category } from '../../../../../../models/category';
import { Subcategory } from '../../../../../../models/subcategory';
import { Subsubcategory } from '../../../../../../models/subsubcategory';
import { SnackBarService } from '../../../../../../services/snack-bar.service';
import { map, Observable, startWith } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  formGroup!: FormGroup;
  marki: Marka[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  subsubcategories: Subsubcategory[] = [];
  categoryId: string = '';
  subcategoryId: string = '';    

  constructor(
    private fb: FormBuilder,
    private markiService: MarkiService,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    private subsubcategoriesService: SubsubcategoriesService,
    public productsService: ProductsHandlerService,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {
    
    this.getAllMarki();
    this.getAllCategories(); 


    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(,\d+)?$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      rozmiar: ['', [Validators.required]],
      kolor: ['', [Validators.required]],
      markaId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      subcategoryId: ['', [Validators.required]],
      subsubcategoryId: ['', [Validators.required]],
    });

    this.formGroup.markAllAsTouched();

    this.formGroup.controls['subcategoryId'].disable();
    this.formGroup.controls['subsubcategoryId'].disable();

  }



  getAllMarki(): void {
    this.markiService.getAll().subscribe({
      next: ((n: TaskResult<Marka[]>) => {
        if (n.success) {
          this.marki = n.model as Marka[];
           
        } else {
          this.snackBarService.setSnackBar(`${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`);
      }
    });
  }
   


  getAllCategories(): void {
    this.categoriesService.getAll().subscribe({
      next: ((n: TaskResult<Category[]>) => {
        if (n.success) {
          // pobranie danych
          this.categories = n.model as Category[];

          if (this.categories.length > 0) {
            this.formGroup.controls['categoryId'].enable();
          } else {
            this.formGroup.controls['categoryId'].disable();
          }
           

        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`);
      }
    });
  }


  getAllSubcategories(categoryId: string): void {
    this.subcategoriesService.getAllByCategoryId(categoryId).subscribe({
      next: ((n: TaskResult<Subcategory[]>) => {
        if (n.success) {
          // pobranie danych
          this.subcategories = n.model as Subcategory[];


          // włącza lub wyłącza kontrolkę subcategoryId
          if (this.subcategories.length > 0) {
            this.formGroup.controls['subcategoryId'].enable();
          } else {
            this.formGroup.controls['subcategoryId'].disable();
          }

          // włącza lub wyłącza kontrolkę subsubcategoryId
          if (this.subsubcategories.length > 0) {
            this.formGroup.controls['subsubcategoryId'].enable();
          } else {
            this.formGroup.controls['subsubcategoryId'].disable();
          }
           

        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`);
      }
    });
  }


  getAllSubsubcategories(categoryId: string, subcategoryId: string) : void {
    this.subsubcategoriesService.getAllByCategoryIdAndSubcategoryId(categoryId, subcategoryId).subscribe({
      next: ((result: TaskResult<Subsubcategory[]>) => {
        if (result.success) {

          this.subsubcategories = result.model as Subsubcategory[];

          // włącza lub wyłącza kontrolkę subsubcategoryId
          if (this.subsubcategories.length > 0) {
            this.formGroup.controls['subsubcategoryId'].enable();
          } else {
            this.formGroup.controls['subsubcategoryId'].disable();
          }
           

        } else {
          this.snackBarService.setSnackBar(`${result.message}`);
        }
        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`);
      }
    });
  }

  

  onSelectionChangeCategory(event: MatSelectChange): void {
    let category = this.categories.find(f => f.name === event.value);
    if (category != null) {
      this.getAllSubcategories(category.categoryId);

      // przypisanie wartości począktowych do drugiego comboBoxa 
      this.formGroup.controls['subcategoryId'].setValue('');

      // przypisanie wartości począktowych do trzeciego comboBoxa
      this.subsubcategories = [];
      this.formGroup.controls['subsubcategoryId'].setValue('');
    }
  }


  onSelectionChangeSubcategory(event: MatSelectChange): void {
    let subcategory = this.subcategories.find(f => f.name === event.value);
    if (subcategory != null) { 
      this.categoryId = subcategory.categoryId == null ? "" : subcategory.categoryId;
      this.subcategoryId = subcategory.subcategoryId;
      this.getAllSubsubcategories(this.categoryId, this.subcategoryId);
    }
  }


}
