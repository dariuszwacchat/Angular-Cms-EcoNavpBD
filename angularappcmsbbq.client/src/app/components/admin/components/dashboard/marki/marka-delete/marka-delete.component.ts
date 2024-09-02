import { Component, Inject, OnInit } from '@angular/core';
import { MarkiHandlerService } from '../../../../../../services/marki/marki-handler.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marka } from '../../../../../../models/marka';

@Component({
  selector: 'app-marka-delete',
  templateUrl: './marka-delete.component.html',
  styleUrl: './marka-delete.component.css'
})
export class MarkaDeleteComponent implements OnInit {

  constructor(
    public markiService: MarkiHandlerService,
    @Inject(MAT_DIALOG_DATA) public marka: Marka
  ) { }

  ngOnInit(): void {
  }


}
