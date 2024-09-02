import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';
import { CategoryCreateComponent } from './components/dashboard/categories/category-create/category-create.component';
import { CategoryEditComponent } from './components/dashboard/categories/category-edit/category-edit.component';
import { AuthGuard } from '../../services/account/auth.guard';
import { SubcategoriesComponent } from './components/dashboard/subcategories/subcategories.component';
import { SubcategoryCreateComponent } from './components/dashboard/subcategories/subcategory-create/subcategory-create.component';
import { SubcategoryEditComponent } from './components/dashboard/subcategories/subcategory-edit/subcategory-edit.component';
import { SubsubcategoriesComponent } from './components/dashboard/subsubcategories/subsubcategories.component';
import { SubsubcategoryCreateComponent } from './components/dashboard/subsubcategories/subsubcategory-create/subsubcategory-create.component';
import { SubsubcategoryEditComponent } from './components/dashboard/subsubcategories/subsubcategory-edit/subsubcategory-edit.component';
import { MarkiComponent } from './components/dashboard/marki/marki.component';
import { MarkaCreateComponent } from './components/dashboard/marki/marka-create/marka-create.component';
import { MarkaEditComponent } from './components/dashboard/marki/marka-edit/marka-edit.component';
import { ProductsComponent } from './components/dashboard/products/products.component';
import { ProductCreateComponent } from './components/dashboard/products/product-create/product-create.component';
import { ProductEditComponent } from './components/dashboard/products/product-edit/product-edit.component';
import { RolesComponent } from './components/dashboard/roles/roles.component';
import { RoleCreateComponent } from './components/dashboard/roles/role-create/role-create.component';
import { RoleEditComponent } from './components/dashboard/roles/role-edit/role-edit.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { UserCreateComponent } from './components/dashboard/users/user-create/user-create.component';
import { UserEditComponent } from './components/dashboard/users/user-edit/user-edit.component';
import { UpdateComponent } from './components/dashboard/account/update/update.component';
import { ChangePasswordComponent } from './components/dashboard/account/change-password/change-password.component';
import { RejestratorLogowaniaComponent } from './components/dashboard/rejestrator-logowania/rejestrator-logowania.component';
import { RejestratorLogowaniaEditComponent } from './components/dashboard/rejestrator-logowania/rejestrator-logowania-edit/rejestrator-logowania-edit.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'roles/roleCreate',
        component: RoleCreateComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'roles/roleEdit/:id',
        component: RoleEditComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
        

      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'users/userCreate',
        component: UserCreateComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'users/userEdit/:id',
        component: UserEditComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },

        
      {
        path: 'marki',
        component: MarkiComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'marki/markaCreate',
        component: MarkaCreateComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'marki/markaEdit/:id',
        component: MarkaEditComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },

      
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'products/productCreate',
        component: ProductCreateComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'products/productEdit/:id',
        component: ProductEditComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      


      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'categories/categoryCreate',
        component: CategoryCreateComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'categories/categoryEdit/:id',
        component: CategoryEditComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },


      {
        path: 'subcategories',
        component: SubcategoriesComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'subcategories/subcategoryCreate',
        component: SubcategoryCreateComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'subcategories/subcategoryEdit/:id',
        component: SubcategoryEditComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },


      {
        path: 'subsubcategories',
        component: SubsubcategoriesComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'subsubcategories/subsubcategoryCreate',
        component: SubsubcategoryCreateComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'subsubcategories/subsubcategoryEdit/:id',
        component: SubsubcategoryEditComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
        
      {
        path: 'update',
        component: UpdateComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },


      {
        path: 'rejestratorLogowania',
        component: RejestratorLogowaniaComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },
      {
        path: 'rejestratorLogowania/rejestratorLogowaniaEdit/:id',
        component: RejestratorLogowaniaEditComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['Administrator'] }
      },


      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
