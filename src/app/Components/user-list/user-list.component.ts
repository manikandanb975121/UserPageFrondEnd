import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../Services/user.service';

import {MatDialog} from '@angular/material/dialog';

// Component
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any;
  constructor(
    private userService: UserService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.userService.fetchUsers();
    this.userService.fetchUpdatedUser().subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }


  deleteUser(id): void {
    console.log(id);
    this.users = this.users.filter(user => user._id !== id);
    this.userService.deleteUser(id);
  }


  updateUser(user): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      height: '500px',
      width: '700px',
      data: {
        // tslint:disable-next-line: object-literal-shorthand
        user: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
