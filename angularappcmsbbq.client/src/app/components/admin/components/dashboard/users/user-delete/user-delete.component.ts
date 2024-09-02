import { Component, Inject, OnInit } from '@angular/core';
import { AccountHandlerService } from '../../../../../../services/account/account-handler.service';
import { ApplicationUser } from '../../../../../../models/applicationUser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersHandlerService } from '../../../../../../services/users/users-handler.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent implements OnInit {

  constructor(
    public usersService: UsersHandlerService,
    @Inject(MAT_DIALOG_DATA) public user: ApplicationUser
  ) { }

  ngOnInit(): void {
  }


}
