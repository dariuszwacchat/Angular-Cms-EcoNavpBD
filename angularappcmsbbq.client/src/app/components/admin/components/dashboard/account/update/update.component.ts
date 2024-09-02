import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../../../../services/account/account.service';
import { AccountHandlerService } from '../../../../../../services/account/account-handler.service';
import { RolesService } from '../../../../../../services/roles/roles.service';
import { ActivatedRoute } from '@angular/router';
import { TaskResult } from '../../../../../../models/taskResult';
import { ApplicationUser } from '../../../../../../models/applicationUser';
import { ApplicationRole } from '../../../../../../models/applicationRole';
import { SnackBarService } from '../../../../../../services/snack-bar.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    public accountHandlerService: AccountHandlerService,
    private roleService: RolesService,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {

    const sessionModel = sessionStorage.getItem('sessionModel') || '';
    if (sessionModel) {
      let sm = JSON.parse(sessionModel);
      let email = sm.model.email;

      this.accountService.getUserByEmail(email).subscribe((s: TaskResult<ApplicationUser>) => {

        if (s.success) {
          this.user = s.model;

          this.formGroup = this.fb.group({
            email: [this.user.email, [Validators.required]],
            imie: [this.user.imie, [Validators.required]],
            nazwisko: [this.user.nazwisko, [Validators.required]],
            ulica: [this.user.ulica, [Validators.required]],
            numerUlicy: [this.user.numerUlicy, [Validators.required, Validators.pattern(/^\d+$/)]],
            miejscowosc: [this.user.miejscowosc, [Validators.required]],
            kraj: [this.user.kraj, [Validators.required]],
            kodPocztowy: [this.user.kodPocztowy, [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]],
            dataUrodzenia: [this.user.dataUrodzenia, [Validators.required]],
            telefon: [this.user.telefon, [Validators.required, Validators.pattern(/^\d+$/)]],
            roleId: [this.user.roleId, [Validators.required]],
          });
          this.formGroup.controls['email'].disable();

        } else {
          this.snackBarService.setSnackBar(s.message);
        }


      });
       

      // pobranie ról i wyświetlenie ich w comboBoxie
      this.roleService.getAll().subscribe({
        next: (n: TaskResult<ApplicationRole[]>) => {
          if (n.success) {
            this.roles = n.model;
          } else {
            this.snackBarService.setSnackBar(n.message);
          }
          return n;
        }
      });

    }
  }


  formGroup!: FormGroup;
  user !: ApplicationUser;
  roles: ApplicationRole[] = [];
}

