import { Component, Input, OnInit } from '@angular/core';
import { Subsubcategory } from '../../../../../models/subsubcategory';
import { SubsubcategoriesService } from '../../../../../services/subsubcategories/subsubcategories.service';
import { TaskResult } from '../../../../../models/taskResult';

@Component({
  selector: 'app-subsubcategories-nav',
  templateUrl: './subsubcategories-nav.component.html',
  styleUrl: './subsubcategories-nav.component.css'
})
export class SubsubcategoriesNavComponent implements OnInit {

  @Input() subcategoryId: string = '';
  @Input() categoryName: string = '';
  @Input() subcategoryName: string = '';

  subsubcategories: Subsubcategory[] = [];

  constructor(
    public subsubcategoriesService: SubsubcategoriesService
  ) { }

  ngOnInit(): void {
    this.subsubcategoriesService.getAll().subscribe((result: TaskResult<Subsubcategory[]>) => {
      for (var i = 0; i < result.model.length; i++) {
        if (result.model[i].subcategoryId === this.subcategoryId) {
          this.subsubcategories.push(result.model[i]);
        }
      }
    });
  }
}
