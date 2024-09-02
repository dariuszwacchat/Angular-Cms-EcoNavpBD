import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesHandlerService } from '../../../../../../services/roles/roles-handler.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css'
})
export class RoleCreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public rolesHandlerService: RolesHandlerService
  ) { }


  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.formGroup.markAllAsTouched();
  }

  formGroup !: FormGroup;

}
