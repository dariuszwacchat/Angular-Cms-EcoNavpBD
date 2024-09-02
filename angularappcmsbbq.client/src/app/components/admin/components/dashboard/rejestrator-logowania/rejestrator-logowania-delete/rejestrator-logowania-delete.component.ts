import { Component, Inject, OnInit } from '@angular/core';
import { RejestratorLogowaniaHandlerService } from '../../../../../../services/rejestratorLogowania/rejestrator-logowania-handler.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RejestratorLogowania } from '../../../../../../models/rejestratorLogowania';

@Component({
  selector: 'app-rejestrator-logowania-delete',
  templateUrl: './rejestrator-logowania-delete.component.html',
  styleUrl: './rejestrator-logowania-delete.component.css'
})
export class RejestratorLogowaniaDeleteComponent implements OnInit {

  constructor(
    public rejestratorLogowaniaService: RejestratorLogowaniaHandlerService,
    @Inject(MAT_DIALOG_DATA) public rejestratorLogowania: RejestratorLogowania
  ) { }

  ngOnInit(): void {
  }


}
