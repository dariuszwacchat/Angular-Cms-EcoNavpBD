import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AccountHandlerService } from '../../../../../services/account/account-handler.service';
import { RolesHandlerService } from '../../../../../services/roles/roles-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationUser } from '../../../../../models/applicationUser';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UsersHandlerService } from '../../../../../services/users/users-handler.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    public accountService: AccountHandlerService,
    public usersService: UsersHandlerService,
    public roleService: RolesHandlerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //alert(this.usersService.users.length);
  }

  ngAfterViewInit(): void {
    this.usersService.initializeDataSource(this.paginator, this.sort);
    this.roleService.getAll();
  }



  openDialogDelete(user: ApplicationUser): void {
    let openRef = this.dialog.open(UserDeleteComponent, {
      data: user
    });
    openRef.afterClosed().subscribe();
  }

}
