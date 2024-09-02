import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module')
        .then((m) => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/web/web.module')
        .then((m) => m.WebModule)
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
