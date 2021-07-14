import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

// Component
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      height: '500px',
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
