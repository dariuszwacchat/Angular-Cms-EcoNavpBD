import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkiService } from '../../../../../../services/marki/marki.service';
import { CategoriesService } from '../../../../../../services/categories/categories.service';
import { SubcategoriesService } from '../../../../../../services/subcategories/subcategories.service';
import { SubsubcategoriesService } from '../../../../../../services/subsubcategories/subsubcategories.service';
import { ProductsService } from '../../../../../../services/products/products.service';
import { ProductsHandlerService } from '../../../../../../services/products/products-handler.service';
import { ActivatedRoute } from '@angular/router';
import { TaskResult } from '../../../../../../models/taskResult';
import { Product } from '../../../../../../models/product';
import { Marka } from '../../../../../../models/marka';
import { Category } from '../../../../../../models/category';
import { Subcategory } from '../../../../../../models/subcategory';
import { Subsubcategory } from '../../../../../../models/subsubcategory';
import { SnackBarService } from '../../../../../../services/snack-bar.service';
import { InfoService } from '../../../../../../services/InfoService';
import { map, Observable, startWith } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  formGroup!: FormGroup;
  product !: Product;
  marki: Marka[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  subsubcategories: Subsubcategory[] = [];
  filteredMarki!: Observable<Marka[]>;
  filteredCategories!: Observable<Category[]>;
  filteredSubcategories!: Observable<Subcategory[]>;
  filteredSubsubcategories!: Observable<Subsubcategory[]>;
  categoryId: string = '';
  subcategoryId: string = '';

  categoryName: string = '';

  constructor(
    private fb: FormBuilder,
    private markiService: MarkiService,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    private subsubcategoriesService: SubsubcategoriesService,
    private productsService: ProductsService,
    public productsHandlerService: ProductsHandlerService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      if (id) {

        this.productsService.get(id).subscribe({
          next: ((result: TaskResult<Product>) => {
            if (result.success) {
              this.product = result.model as Product;
              if (this.product) {

                // załadowanie danych do comboBoxów
                let markaId = this.product.markaId == null ? '' : this.product.markaId;
                let categoryId = this.product.categoryId == null ? '' : this.product.categoryId;
                let subcategoryId = this.product.subcategoryId == null ? '' : this.product.subcategoryId;
                let subsubcategoryId = this.product.subsubcategoryId == null ? '' : this.product.subsubcategoryId;


                this.getAllMarki();
                this.getAllCategories();
                this.getAllSubcategories(categoryId);
                this.getAllSubsubcategories(categoryId, subcategoryId);
                 

                this.formGroup = this.fb.group({
                  name: [this.product.name, [Validators.required, Validators.minLength(2)]],
                  description: [this.product.description, [Validators.required]],
                  price: [this.product.price, [Validators.required, Validators.pattern(/^\d+(,\d+)?$/)]],
                  quantity: [this.product.quantity, [Validators.required, Validators.pattern(/^\d+$/)]],
                  rozmiar: [this.product.rozmiar, [Validators.required]],
                  kolor: [this.product.kolor, [Validators.required]],
                  markaId: [markaId, [Validators.required]],
                  categoryId: [categoryId, [Validators.required]],
                  subcategoryId: [subcategoryId, [Validators.required]],
                  subsubcategoryId: [subsubcategoryId, [Validators.required]],
                });



              }
            }
            return result;
          }),
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('ProductEditComponent', 'get')}. Name: ${error.name}. Message: ${error.message}`);
          }
        });
      }
    });

    this.formGroup.controls['markaId'].setValue('sss');
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


  getAllSubsubcategories(categoryId: string, subcategoryId: string): void {
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
