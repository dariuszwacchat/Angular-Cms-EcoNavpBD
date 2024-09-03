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
      next: ((result: TaskResult<Marka[]>) => {
        if (result.success) {
          let data = result.model as Marka[];
          this.marki = data.sort((a, b) => a.name.localeCompare(b.name));
           
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
   


  getAllCategories(): void {
    this.categoriesService.getAll().subscribe({
      next: ((result: TaskResult<Category[]>) => {
        if (result.success) {
          // pobranie danych
          let data = result.model as Category[];
          this.categories = data.sort((a, b) => a.name.localeCompare(b.name));

          if (this.categories.length > 0) {
            this.formGroup.controls['categoryId'].enable();
          } else {
            this.formGroup.controls['categoryId'].disable();
          }
           

        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
        }
        return result;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`);
      }
    });
  }



  getAllSubcategories(categoryId: string): void {
    if (categoryId.length > 0) {
      this.subcategoriesService.getAllByCategoryId(categoryId).subscribe({
        next: ((result: TaskResult<Subcategory[]>) => {
          if (result.success) {
            // pobranie danych
            let data = result.model as Subcategory[];
            this.subcategories = data.sort((a, b) => a.name.localeCompare(b.name));


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
            this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
          }
          return result;
        }),
        error: (error: Error) => {
          this.snackBarService.setSnackBar(`${error.message}`);
        }
      });
    }
  }


  getAllSubsubcategories(categoryId: string, subcategoryId: string): void {
    if (categoryId.length > 0 && subcategoryId.length > 0) {
      this.subsubcategoriesService.getAllByCategoryIdAndSubcategoryId(categoryId, subcategoryId).subscribe({
        next: ((result: TaskResult<Subsubcategory[]>) => {
          if (result.success) {

            let data = result.model as Subsubcategory[];
            this.subsubcategories = data.sort((a, b) => a.name.localeCompare(b.name));

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
  }

  

  onSelectionChangeCategory(event: MatSelectChange): void {
    let category = this.categories.find(f => f.categoryId === event.value);
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
    let subcategory = this.subcategories.find(f => f.subcategoryId === event.value);
    if (subcategory != null) { 
      this.categoryId = subcategory.categoryId == null ? "" : subcategory.categoryId;
      this.subcategoryId = subcategory.subcategoryId;
      this.getAllSubsubcategories(this.categoryId, this.subcategoryId);
    }
  }


}
