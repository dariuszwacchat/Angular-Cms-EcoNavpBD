import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountHandlerService } from '../../../../../../services/account/account-handler.service';
import { RolesService } from '../../../../../../services/roles/roles.service';
import { TaskResult } from '../../../../../../models/taskResult';
import { ApplicationRole } from '../../../../../../models/applicationRole';
import { UsersHandlerService } from '../../../../../../services/users/users-handler.service';
import { SnackBarService } from '../../../../../../services/snack-bar.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public usersService: UsersHandlerService, 
    private roleService: RolesService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      emailRegister: ['', [Validators.required]],
      passwordRegister: ['', [Validators.minLength(10), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/]).{8,}$/)]],
      imie: ['', [Validators.required/*, Validators.pattern(/^[A-Za-z]+$/)*/]],
      nazwisko: ['', [Validators.required]],
      ulica: ['', [Validators.required]],
      numerUlicy: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      miejscowosc: ['', [Validators.required]],
      kraj: ['', [Validators.required]],
      kodPocztowy: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]],
      dataUrodzenia: ['', [Validators.required]],
      telefon: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      roleName: ['', [Validators.required]],
    });

    this.formGroup.markAllAsTouched();


    // pobranie ról i wyświetlenie ich w comboBoxie
    this.roleService.getAll().subscribe({
      next: ((n: TaskResult<ApplicationRole[]>) => {
        if (n.success) {
          // pobranie danych
          this.roles = n.model as ApplicationRole [];
        } else {
          this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
        }
        return n;
      }),
      error: (error: Error) => {
        this.snackBarService.setSnackBar(`${error.message}`);
      }
    });
  }

  formGroup !: FormGroup;
  roles: ApplicationRole[] = [];
}
