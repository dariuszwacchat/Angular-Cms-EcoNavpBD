import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';
import { CategoryCreateComponent } from './components/dashboard/categories/category-create/category-create.component';
import { CategoryDeleteComponent } from './components/dashboard/categories/category-delete/category-delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryEditComponent } from './components/dashboard/categories/category-edit/category-edit.component';
import { SubcategoriesComponent } from './components/dashboard/subcategories/subcategories.component';
import { SubsubcategoriesComponent } from './components/dashboard/subsubcategories/subsubcategories.component';
import { SubsubcategoryCreateComponent } from './components/dashboard/subsubcategories/subsubcategory-create/subsubcategory-create.component';
import { SubsubcategoryDeleteComponent } from './components/dashboard/subsubcategories/subsubcategory-delete/subsubcategory-delete.component';
import { SubsubcategoryEditComponent } from './components/dashboard/subsubcategories/subsubcategory-edit/subsubcategory-edit.component';
import { SubcategoryCreateComponent } from './components/dashboard/subcategories/subcategory-create/subcategory-create.component';
import { SubcategoryDeleteComponent } from './components/dashboard/subcategories/subcategory-delete/subcategory-delete.component';
import { SubcategoryEditComponent } from './components/dashboard/subcategories/subcategory-edit/subcategory-edit.component';
import { ProductsComponent } from './components/dashboard/products/products.component';
import { MarkiComponent } from './components/dashboard/marki/marki.component';
import { ProductCreateComponent } from './components/dashboard/products/product-create/product-create.component';
import { ProductDeleteComponent } from './components/dashboard/products/product-delete/product-delete.component';
import { ProductEditComponent } from './components/dashboard/products/product-edit/product-edit.component';
import { MarkaCreateComponent } from './components/dashboard/marki/marka-create/marka-create.component';
import { MarkaDeleteComponent } from './components/dashboard/marki/marka-delete/marka-delete.component';
import { MarkaEditComponent } from './components/dashboard/marki/marka-edit/marka-edit.component';
import { RolesComponent } from './components/dashboard/roles/roles.component';
import { RoleCreateComponent } from './components/dashboard/roles/role-create/role-create.component';
import { RoleDeleteComponent } from './components/dashboard/roles/role-delete/role-delete.component';
import { RoleEditComponent } from './components/dashboard/roles/role-edit/role-edit.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { ChangePasswordComponent } from './components/dashboard/account/change-password/change-password.component';
import { UpdateComponent } from './components/dashboard/account/update/update.component';
import { RejestratorLogowaniaComponent } from './components/dashboard/rejestrator-logowania/rejestrator-logowania.component';
import { RejestratorLogowaniaDeleteComponent } from './components/dashboard/rejestrator-logowania/rejestrator-logowania-delete/rejestrator-logowania-delete.component';
import { RejestratorLogowaniaEditComponent } from './components/dashboard/rejestrator-logowania/rejestrator-logowania-edit/rejestrator-logowania-edit.component';
import { UserCreateComponent } from './components/dashboard/users/user-create/user-create.component';
import { UserDeleteComponent } from './components/dashboard/users/user-delete/user-delete.component';
import { UserEditComponent } from './components/dashboard/users/user-edit/user-edit.component';
import { AccountService } from '../../services/account/account.service';
import { AuthInterceptor } from '../../services/account/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    CategoryCreateComponent,
    CategoryDeleteComponent,
    CategoryEditComponent,
    SubcategoriesComponent,
    SubsubcategoriesComponent,
    SubsubcategoryCreateComponent,
    SubsubcategoryDeleteComponent,
    SubsubcategoryEditComponent,
    SubcategoryCreateComponent,
    SubcategoryDeleteComponent,
    SubcategoryEditComponent,
    ProductsComponent,
    MarkiComponent,  
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductEditComponent,
    MarkaCreateComponent,
    MarkaDeleteComponent,
    MarkaEditComponent,
    RolesComponent,
    RoleCreateComponent,
    RoleDeleteComponent,
    RoleEditComponent,
    UsersComponent,
    UserCreateComponent,
    UserDeleteComponent,
    UserEditComponent,
    ChangePasswordComponent,
    UpdateComponent,
    RejestratorLogowaniaComponent,
    RejestratorLogowaniaDeleteComponent,
    RejestratorLogowaniaEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    CdkStepperModule
  ],
  providers: [
    /*AccountService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimationsAsync(),*/
  ]
})
export class AdminModule { }
