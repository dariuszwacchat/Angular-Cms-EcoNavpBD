import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../../../../../../services/roles/roles.service';
import { RolesHandlerService } from '../../../../../../services/roles/roles-handler.service';
import { ActivatedRoute } from '@angular/router';
import { TaskResult } from '../../../../../../models/taskResult';
import { ApplicationRole } from '../../../../../../models/applicationRole';
import { SnackBarService } from '../../../../../../services/snack-bar.service';
import { InfoService } from '../../../../../../services/InfoService';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent implements OnInit {
  
  formGroup!: FormGroup;
  role !: ApplicationRole;

  constructor(
    private fb: FormBuilder,
    public rolesService: RolesService,
    public rolesServiceHandler: RolesHandlerService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {

        this.rolesService.get(id).subscribe({
          next: ((result: TaskResult<ApplicationRole>) => {
            if (result.success) {

              this.role = result.model as ApplicationRole;
              if (this.role) {
                this.formGroup = this.fb.group({
                  name: [this.role.name, [Validators.required, Validators.minLength(3)]]
                });
              }

            } else {
              this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${result.message}`);
            }
            return result;
          }),
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RoleEditComponent', 'get')}. Name: ${error.name}. Message: ${error.message}`);
          }
        });
        
      }
    });
  }


}
