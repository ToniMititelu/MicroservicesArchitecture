import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { PasswordChanges, User } from '../../models/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  me: User;

  loading = false;

  formData: PasswordChanges = {};

  constructor(readonly authService: AuthService,
              readonly messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.authService.getMe()
      .subscribe((response: User) => {
        this.me = response;
        this.loading = false;
      });
  }

  updateProfile(): void {
    this.authService.updateUser(this.me)
      .subscribe((response: User) => {
        this.messageService.add({severity: 'success', summary: 'Profile updated'});
      }, (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Failed to update profile', detail: error.error.message});
      });
  }

  changePassword(): void {
    if (!this.formData?.newPassword || !this.formData?.oldPassword) {
      this.messageService.add({severity: 'error', summary: 'Please fill both password fields'});
      return;
    }

    this.authService.changePassword(this.formData)
      .subscribe((response) => {
        this.messageService.add({severity: 'success', summary: 'Password updated successfully'});
        this.formData.oldPassword = '';
        this.formData.newPassword = '';
      }, (error: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: 'Failed to update password', detail: error.error.message});
      });
  }
}
