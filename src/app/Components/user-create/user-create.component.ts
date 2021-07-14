import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// Model
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// Services
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  imagePreview: any;
  userForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    emailId: new FormControl(''),
    phoneNumber: new FormControl(''),
    profile_pic: new FormControl('')
  });
  updateUser: any;

  constructor(
    private userServices: UserService,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {

      this.userForm = new FormGroup({
        first_name: new FormControl(this.data.user.firstName),
        last_name: new FormControl(this.data.user.lastName),
        emailId: new FormControl(this.data.user.email),
        phoneNumber: new FormControl(this.data.user.phoneNumber),
        // profile_pic: new FormControl(this.data.firstName)
      });
    }
  }


  imagePicker(e): void {
    // console.log(e);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      this.userForm.patchValue({
        profile_pic: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        // console.log(this.imagePreview);
      };
      reader.readAsDataURL(file);
    }
  }

  createUser(): void {
    console.log(this.userForm.value);
    const formData = new FormData();
    formData.append('first_name', this.userForm.value.first_name);
    formData.append('last_name', this.userForm.value.last_name);
    formData.append('emailId', this.userForm.value.emailId);
    formData.append('phone_number', this.userForm.value.phoneNumber);
    formData.append('profile_pic', this.userForm.value.profile_pic);
    this.userServices.createUser(formData);
  }

  updatUser(): void {
    const user = {
      firstName: this.userForm.value.first_name,
      lastName: this.userForm.value.last_name,
      email: this.userForm.value.emailId,
      phoneNumber: this.userForm.value.phoneNumber,
      id: this.data.user._id
    };
    console.log(user);
    this.userServices.updateUser(user);
  }
}
