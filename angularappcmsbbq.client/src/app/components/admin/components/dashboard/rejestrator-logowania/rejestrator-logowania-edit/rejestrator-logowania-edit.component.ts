import { Component, OnInit } from '@angular/core';
import { RejestratorLogowania } from '../../../../../../models/rejestratorLogowania';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RejestratorLogowaniaService } from '../../../../../../services/rejestratorLogowania/rejestrator-logowania.service';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../../../../../../services/snack-bar.service';
import { TaskResult } from '../../../../../../models/taskResult';
import { RejestratorLogowaniaHandlerService } from '../../../../../../services/rejestratorLogowania/rejestrator-logowania-handler.service';
import { InfoService } from '../../../../../../services/InfoService';

@Component({
  selector: 'app-rejestrator-logowania-edit',
  templateUrl: './rejestrator-logowania-edit.component.html',
  styleUrl: './rejestrator-logowania-edit.component.css'
})
export class RejestratorLogowaniaEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public rejestratorLogowaniaService: RejestratorLogowaniaService,
    public rejestratorLogowaniaHandlerService: RejestratorLogowaniaHandlerService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
         

        this.rejestratorLogowaniaService.get(id).subscribe({
          next: ((n: TaskResult<RejestratorLogowania>) => {
            if (n.success) {

              this.rejestratorLogowania = n.model as RejestratorLogowania;
              if (this.rejestratorLogowania) {

                let dataZalogowania = new Date(this.rejestratorLogowania.dataZalogowania);
                let dataWylogowania = this.rejestratorLogowania.dataWylogowania ? new Date(this.rejestratorLogowania.dataWylogowania) : null;


                this.formGroup = this.fb.group({
                  dataZalogowania: [dataZalogowania, [Validators.required]],
                  dataWylogowania: [dataWylogowania, [Validators.required]],
                  userId: [this.rejestratorLogowania.userId, [Validators.required]],
                });
              }

            } else {
              this.snackBarService.setSnackBar(`Dane nie zostały załadowane. ${n.message}`);
            }
            return n;
          }),
          error: (error: Error) => {
            this.snackBarService.setSnackBar(`Brak połączenia z bazą danych. ${InfoService.info('RejestratorLogowaniaEditComponent', 'get')}. Name: ${error.name}. Message: ${error.message}`);
          }
        });

      }
    });
  }

  formGroup!: FormGroup;
  rejestratorLogowania !: RejestratorLogowania;


}
