import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../services/categories/categories.service';
import { CategoriesHandlerService } from '../../../../../../services/categories/categories-handler.service';
import { ActivatedRoute } from '@angular/router';
import { TaskResult } from '../../../../../../models/taskResult';
import { Category } from '../../../../../../models/category';
import { SnackBarService } from '../../../../../../services/snack-bar.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public categoryService: CategoriesService,
    public categoriesHandlerService: CategoriesHandlerService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {


        this.categoryService.get(id).subscribe({
          next: ((s: TaskResult<Category>) => {
            if (s.success) {

              this.category = s.model as Category;
              if (this.category) {
                this.formGroup = this.fb.group({
                  name: [this.category.name, [Validators.required, Validators.minLength(3)]],
                  fullName: [this.category.fullName, [Validators.required, Validators.minLength(3)]],
                });
              }

            } else {
              this.snackBarService.setSnackBar(`${s.message}`);
            }
            return s;
          }),
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`${error.message}`);
          }
        });


      }
    });
  }

  formGroup!: FormGroup;
  category !: Category;


}
