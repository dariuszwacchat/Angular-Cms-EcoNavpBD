import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AccountHandlerService } from '../../../../../services/account/account-handler.service';
import { MarkiHandlerService } from '../../../../../services/marki/marki-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { Marka } from '../../../../../models/marka';
import { MarkaDeleteComponent } from './marka-delete/marka-delete.component';

@Component({
  selector: 'app-marki',
  templateUrl: './marki.component.html',
  styleUrl: './marki.component.css'
})
export class MarkiComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public accountService: AccountHandlerService,
    public markiService: MarkiHandlerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.markiService.initializeDataSource(this.paginator, this.sort);
  }

   
  openDialogDelete(marka: Marka): void {
    let openRef = this.dialog.open(MarkaDeleteComponent, {
      data: marka
    });
    openRef.afterClosed().subscribe();
  }

  currentPageIndex: number = 0;
  pageSize: number = 5;
  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
  }

  getIndex(index: number): number {
    return this.currentPageIndex * this.pageSize + index + 1;
  }

}
