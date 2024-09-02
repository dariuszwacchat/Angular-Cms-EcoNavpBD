import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesHandlerService } from '../../../../../../services/categories/categories-handler.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public categoriesService: CategoriesHandlerService
  ) { }

  formGroup !: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.formGroup.markAllAsTouched();
  }


}
