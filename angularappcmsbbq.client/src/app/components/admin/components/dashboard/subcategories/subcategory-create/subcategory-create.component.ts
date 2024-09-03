import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../services/categories/categories.service';
import { SubcategoriesHandlerService } from '../../../../../../services/subcategories/subcategories-handler.service';
import { TaskResult } from '../../../../../../models/taskResult';
import { Category } from '../../../../../../models/category';
import { SnackBarService } from '../../../../../../services/snack-bar.service';

@Component({
  selector: 'app-subcategory-create',
  templateUrl: './subcategory-create.component.html',
  styleUrl: './subcategory-create.component.css'
})
export class SubcategoryCreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    public subcategoriesService: SubcategoriesHandlerService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void { 

    this.categoriesService.getAll().subscribe({
      next: ((n: TaskResult<Category[]>) => {
        if (n.success) {
          // pobranie danych
          this.categories = n.model as Category[];
          this.categories = this.categories.sort((a, b) => a.name.localeCompare(b.name));

        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`);
      }
    });


    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      categoryId: ['', [Validators.required]],
    });

    this.formGroup.markAllAsTouched();
  }

  formGroup !: FormGroup;
  categories: Category[] = [];

}
