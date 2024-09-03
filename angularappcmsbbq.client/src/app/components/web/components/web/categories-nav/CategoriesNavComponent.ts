import { Component, OnInit } from "@angular/core";
import { TaskResult } from "../../../../../models/taskResult";
import { CategoriesService } from "../../../../../services/categories/categories.service";
import { CategoriesHandlerService } from "../../../../../services/categories/categories-handler.service";
import { Category } from "../../../../../models/category";
import { Observable } from "rxjs";


@Component({
    selector: 'app-categories-nav',
    templateUrl: './categories-nav.component.html',
    styleUrl: './categories-nav.component.css'
})
export class CategoriesNavComponent implements OnInit {

    constructor(
        private categoriesService: CategoriesService,
        public categoriesServiceHandler: CategoriesHandlerService
    ) {
    }

    ngOnInit(): void {
        this.categories$ = this.categoriesService.getAll();
        this.categories$.subscribe((result: TaskResult<Category[]>) => {
          this.categories = result.model;
        });
    }

    categories$!: Observable<TaskResult<Category[]>>;
    categories: Category[] = [];

}
