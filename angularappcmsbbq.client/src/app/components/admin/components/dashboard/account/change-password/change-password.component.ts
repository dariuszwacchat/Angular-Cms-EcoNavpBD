import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountHandlerService } from '../../../../../../services/account/account-handler.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {

  formGroup !: FormGroup;

  constructor(
    private fb: FormBuilder,
    public accountService: AccountHandlerService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/]).{8,}$/)]],
    });

    this.formGroup.markAllAsTouched();
  }


}
