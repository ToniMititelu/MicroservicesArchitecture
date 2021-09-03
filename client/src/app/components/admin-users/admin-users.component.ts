import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: User[] = [];

  editedUser: User;

  roles: {label: string, value: string}[];

  clonedUsers: { [s: string]: User; } = {};

  constructor(readonly authService: AuthService,
              readonly messageService: MessageService) {
  }

  ngOnInit(): void {
    this.roles = [{label: 'User', value: 'USER'}, {label: 'Admin', value: 'ADMIN'}];
    this.authService.getUsers()
      .subscribe((response: User[]) => {
        this.users = response;
      }, (error: HttpErrorResponse) => console.error(error));
  }

  onRowEditInit(user: User): void {
    this.clonedUsers[user.email] = {...user};
  }

  onRowEditSave(user: User): void {
    this.authService.updateUser(user)
      .subscribe((response: User) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is updated'});
        delete this.clonedUsers[user.email];
      }, (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong, try again'});
      });
  }

  onRowEditCancel(user: User, index: number): void {
    this.users[index] = this.clonedUsers[user.email];
    delete this.clonedUsers[user.email];
  }
}
