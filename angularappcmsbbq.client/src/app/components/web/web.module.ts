import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './components/web/web.component';
import { HomeComponent } from './components/web/home/home.component';
import { ContactComponent } from './components/web/contact/contact.component';
import { ProductsComponent } from './components/web/products/products.component';
import { CategoriesNavComponent } from './components/web/categories-nav/CategoriesNavComponent';
import { SubcategoriesNavComponent } from './components/web/subcategories-nav/subcategories-nav.component';
import { SubsubcategoriesNavComponent } from './components/web/subsubcategories-nav/subsubcategories-nav.component';
import { SubcategoryNavDetailsComponent } from './components/web/subcategories-nav/subcategory-nav-details/subcategory-nav-details.component';
import { SubsubcategoryNavDetailsComponent } from './components/web/subsubcategories-nav/subsubcategory-nav-details/subsubcategory-nav-details.component';
import { CategoryNavDetailsComponent } from './components/web/categories-nav/category-nav-details/category-nav-details.component';


@NgModule({
  declarations: [
    WebComponent,
    HomeComponent,
    ContactComponent,
    ProductsComponent,
    CategoriesNavComponent,
    SubcategoriesNavComponent,
    SubsubcategoriesNavComponent,
    SubcategoryNavDetailsComponent,
    SubsubcategoryNavDetailsComponent,
    CategoryNavDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WebRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
  ]
})
export class WebModule { }
