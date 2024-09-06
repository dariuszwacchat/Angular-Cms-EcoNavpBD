import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponent } from './components/web/web.component';
import { HomeComponent } from './components/web/home/home.component';
import { ProductsComponent } from './components/web/products/products.component';
import { ContactComponent } from './components/web/contact/contact.component';
import { CategoryNavDetailsComponent } from './components/web/categories-nav/category-nav-details/category-nav-details.component';
import { SubcategoryNavDetailsComponent } from './components/web/subcategories-nav/subcategory-nav-details/subcategory-nav-details.component';
import { SubsubcategoryNavDetailsComponent } from './components/web/subsubcategories-nav/subsubcategory-nav-details/subsubcategory-nav-details.component';
 


const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: ':categoryName',
        component: CategoryNavDetailsComponent
      },
      {
        path: ':categoryName/:subcategoryName',
        component: SubcategoryNavDetailsComponent
      },
      {
        path: ':categoryName/:subcategoryName/:subsubcategoryName',
        component: SubsubcategoryNavDetailsComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
