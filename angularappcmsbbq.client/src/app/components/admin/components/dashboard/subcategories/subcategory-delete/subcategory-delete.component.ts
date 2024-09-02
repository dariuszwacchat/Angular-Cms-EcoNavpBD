import { Component, Inject, OnInit } from '@angular/core';
import { SubcategoriesHandlerService } from '../../../../../../services/subcategories/subcategories-handler.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subcategory } from '../../../../../../models/subcategory';

@Component({
  selector: 'app-subcategory-delete',
  templateUrl: './subcategory-delete.component.html',
  styleUrl: './subcategory-delete.component.css'
})
export class SubcategoryDeleteComponent implements OnInit {

  constructor(
    public subcategoriesService: SubcategoriesHandlerService,
    @Inject(MAT_DIALOG_DATA) public subcategory: Subcategory
  ) { }

  ngOnInit(): void {
  }


}
