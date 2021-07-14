import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:5000';
  private user = new Subject<any>();
  constructor(
    private http: HttpClient
  ) { }


  createUser(data): void {
    this.http.post<{ message: string, result: any}>(`${this.url}/api/user`, data).subscribe((response) => {
      console.log(response);
      this.user.next(response.result);
    });
  }

  fetchUsers(): void {
    this.http.get<{ message: string, result: any}>( `${this.url}/api/user`).subscribe((response) => {
      this.user.next(response.result);
    });
  }

  fetchUpdatedUser(): any {
    return this.user.asObservable();
  }

  deleteUser(id): any {
    this.http.delete(`${this.url}/api/user/${id}`).subscribe((response) => {
      console.log(response);
    });
  }


  updateUser(user): any {
    this.http.post(`${this.url}/api/user/${user.id}/update`, user).subscribe((response) => {
      console.log(response);
    });
  }
}
