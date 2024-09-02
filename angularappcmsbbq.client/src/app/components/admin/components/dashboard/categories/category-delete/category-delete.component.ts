import { Component, Inject, OnInit } from '@angular/core';
import { CategoriesHandlerService } from '../../../../../../services/categories/categories-handler.service';
import { Category } from '../../../../../../models/category';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.css'
})
export class CategoryDeleteComponent implements OnInit {

  constructor(
    public categoriesService: CategoriesHandlerService,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) { }

  ngOnInit(): void {
  }


}
