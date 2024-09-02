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
    this.subsubcategoriesService.getAll().subscribe((n: TaskResult<Subsubcategory[]>) => {
      for (var i = 0; i < n.model.length; i++) {
        if (n.model[i].subcategoryId === this.subcategoryId) {
          this.subsubcategories.push(n.model[i]);
        }
      }
    });
  }
}
