import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../services/categories/categories.service';
import { SubcategoriesService } from '../../../../../../services/subcategories/subcategories.service';
import { SubsubcategoriesService } from '../../../../../../services/subsubcategories/subsubcategories.service';
import { SubsubcategoriesHandlerService } from '../../../../../../services/subsubcategories/subsubcategories-handler.service';
import { ActivatedRoute } from '@angular/router';
import { TaskResult } from '../../../../../../models/taskResult';
import { Subsubcategory } from '../../../../../../models/subsubcategory';
import { Category } from '../../../../../../models/category';
import { Subcategory } from '../../../../../../models/subcategory';
import { SnackBarService } from '../../../../../../services/snack-bar.service';
import { map, Observable, startWith } from 'rxjs';
import { InfoService } from '../../../../../../services/InfoService';
import { MatSelectChange } from '@angular/material/select';
import { CategoriesHandlerService } from '../../../../../../services/categories/categories-handler.service';
import { SubcategoriesHandlerService } from '../../../../../../services/subcategories/subcategories-handler.service';

@Component({
  selector: 'app-subsubcategory-edit',
  templateUrl: './subsubcategory-edit.component.html',
  styleUrl: './subsubcategory-edit.component.css'
})
export class SubsubcategoryEditComponent implements OnInit {

  formGroup!: FormGroup;
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  subsubcategory !: Subsubcategory;
  subsubcategories: Subsubcategory[] = [];
  categoryId: string = '';
  subCategoryDisabled = false;
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private categoriesHandlerService: CategoriesHandlerService,
    private subcategoriesService: SubcategoriesService,
    private subcategoriesHandlerService: SubcategoriesHandlerService,
    private subsubcategoriesService: SubsubcategoriesService,
    public subsubcategoriesHandlerService: SubsubcategoriesHandlerService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      if (id) {

        // SPRAWDZIĆ TU CZY NIE MA BŁĘDU CHODZI O NAWIASY PO LEWEJ STRONIE

        this.subsubcategoriesService.get(id).subscribe({
          next: ((n: TaskResult<Subsubcategory>) => {
            if (n.success) {
              this.subsubcategory = n.model as Subsubcategory;
              if (this.subsubcategory) {


                // załadowanie danych do comboBoxów
                let categoryId = this.subsubcategory.categoryId == null ? '' : this.subsubcategory.categoryId;
                let subcategoryId = this.subsubcategory.subcategoryId == null ? '' : this.subsubcategory.subcategoryId;

                this.getAllCategories();
                this.getAllSubcategories(categoryId);


                this.formGroup = this.fb.group({
                  name: [this.subsubcategory.name, [Validators.required, Validators.minLength(2)]],
                  fullName: [this.subsubcategory.fullName, [Validators.required, Validators.minLength(2)]],
                  categoryId: [categoryId, [Validators.required]],
                  subcategoryId: [subcategoryId, [Validators.required]]
                });



              }
            }
            else {
              this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
            }

            return n;
          }),
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('SubsubcategoryEditComponent', '')}. Name: ${error.name}. Message: ${error.message}`);
          }
        });



      }
    });

  }





  getAllCategories(): void {
    this.categoriesService.getAll().subscribe({
      next: ((n: TaskResult<Category[]>) => {
        if (n.success) {
          // pobranie danych
          let data = n.model as Category[];
          this.categories = data.sort((a, b) => a.name.localeCompare(b.name)); 

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
          let data = n.model as Subcategory[];
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
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
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
    }
  }


}
