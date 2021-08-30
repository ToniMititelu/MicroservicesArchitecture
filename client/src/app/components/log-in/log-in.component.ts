import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { UserLogIn } from '../../models/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Token } from '../../models/token.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  user: UserLogIn = {};
  requiredFields = ['email', 'password'];

  constructor(readonly messageService: MessageService,
              readonly authService: AuthService,
              readonly localStorageService: LocalStorageService,
              readonly router: Router) {
  }

  logIn(): void {
    const missingFields = [];
    this.requiredFields.forEach(field => {
      if (!this.user[field]) {
        missingFields.push({
          severity: 'error',
          summary: 'Field missing',
          detail: `${field} is required`
        });
      }
    });
    if (missingFields.length) {
      this.messageService.addAll(missingFields);
      return;
    }

    this.authService.logIn(this.user)
      .subscribe((response: Token) => {
        this.localStorageService.setItem('access_token', response.access_token);
        this.localStorageService.setItem('refresh_token', response.refresh_token);
        this.localStorageService.setItem('role', response.role);
        window.location.href = '/home';
      }, ((error: HttpErrorResponse) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: error.error.message
        });
      }));
  }

}
