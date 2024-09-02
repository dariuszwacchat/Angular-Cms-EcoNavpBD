import { Component, Inject, OnInit } from '@angular/core';
import { SubsubcategoriesHandlerService } from '../../../../../../services/subsubcategories/subsubcategories-handler.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subsubcategory } from '../../../../../../models/subsubcategory';

@Component({
  selector: 'app-subsubcategory-delete',
  templateUrl: './subsubcategory-delete.component.html',
  styleUrl: './subsubcategory-delete.component.css'
})
export class SubsubcategoryDeleteComponent implements OnInit {

  constructor(
    public subsubcategoriesService: SubsubcategoriesHandlerService,
    @Inject(MAT_DIALOG_DATA) public subsubcategory: Subsubcategory
  ) { }

  ngOnInit(): void { 
  }


}
