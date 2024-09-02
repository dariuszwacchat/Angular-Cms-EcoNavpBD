import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../services/categories/categories.service';
import { SubcategoriesService } from '../../../../../../services/subcategories/subcategories.service';
import { SubcategoriesHandlerService } from '../../../../../../services/subcategories/subcategories-handler.service';
import { ActivatedRoute } from '@angular/router';
import { TaskResult } from '../../../../../../models/taskResult';
import { Subcategory } from '../../../../../../models/subcategory';
import { Category } from '../../../../../../models/category';
import { SnackBarService } from '../../../../../../services/snack-bar.service';
import { InfoService } from '../../../../../../services/InfoService';

@Component({
  selector: 'app-subcategory-edit',
  templateUrl: './subcategory-edit.component.html',
  styleUrl: './subcategory-edit.component.css'
})
export class SubcategoryEditComponent implements OnInit {
   
  formGroup!: FormGroup;
  subcategory !: Subcategory;
  category !: Category;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private subcategoriesService: SubcategoriesService,
    public subcategoriesHandlerService: SubcategoriesHandlerService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');

      if (id) {

        this.subcategoriesService.get(id).subscribe({
          next: ((n: TaskResult<Subcategory>) => {
            if (n.success) { 

              this.subcategory = n.model as Subcategory;
              if (this.subcategory) {


                this.formGroup = this.fb.group({
                  name: [this.subcategory.name, [Validators.required, Validators.minLength(2)]],
                  fullName: [this.subcategory.fullName, [Validators.required, Validators.minLength(2)]],
                  categoryId: [this.subcategory.categoryId, [Validators.required]]
                });
              }

            } else {
              this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
            }
            return n;
          }),
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('SubcategoryEditComponent', 'get')}. Name: ${error.name}. Message: ${error.message}`);
          }
        });




        this.categoriesService.getAll().subscribe({
          next: (n: TaskResult<Category[]>) => {
            if (n.success) {
              // pobranie danych
              this.categories = n.model as Category [];
            } else {
              this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
            }
            return n;
          },
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('SubcategoryEditComponent', 'getAll')}. Name: ${error.name}. Message: ${error.message}`);
          }
        });

      }
    });  
  }

}
