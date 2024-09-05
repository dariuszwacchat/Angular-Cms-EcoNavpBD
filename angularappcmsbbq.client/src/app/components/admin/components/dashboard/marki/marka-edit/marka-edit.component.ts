import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkiService } from '../../../../../../services/marki/marki.service';
import { MarkiHandlerService } from '../../../../../../services/marki/marki-handler.service';
import { ActivatedRoute } from '@angular/router';
import { TaskResult } from '../../../../../../models/taskResult';
import { Marka } from '../../../../../../models/marka';
import { SnackBarService } from '../../../../../../services/snack-bar.service';

@Component({
  selector: 'app-marka-edit',
  templateUrl: './marka-edit.component.html',
  styleUrl: './marka-edit.component.css'
})
export class MarkaEditComponent implements OnInit {

  formGroup!: FormGroup;
  marka !: Marka;

  constructor(
    private fb: FormBuilder,
    private markiService: MarkiService,
    public markiHandlerService: MarkiHandlerService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        
        this.markiService.get(id).subscribe({
          next: ((result: TaskResult<Marka>) => {
            if (result.success) {

              this.marka = result.model as Marka;
              if (this.marka) {
                this.formGroup = this.fb.group({
                  name: [this.marka.name, [Validators.required, Validators.minLength(2)]]
                });
              }

            } else {
              this.snackBarService.setSnackBar(`${result.message}`);
            }
            return result;
          }),
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`${error.message}`);
          }
        });

      }
    });
  }



}
