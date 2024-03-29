import {Component} from '@angular/core';
import {User, UserRegister} from '../../models/user.interface';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent {
  user: UserRegister = {role: 'USER'};
  requiredFields = ['username', 'email', 'password_1', 'password_2'];

  constructor(readonly messageService: MessageService,
              readonly authService: AuthService,
              readonly router: Router) {
  }

  register(): void {
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

    if (!this.validateEmail(this.user.email)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Email is not valid'
      });
      return;
    }

    if (this.user.password_1 !== this.user.password_2) {
      this.messageService.add({
        severity: 'error',
        summary: 'Passwords do not match'
      });
      return;
    }

    this.authService.register(this.user)
      .subscribe((response: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Congrats! You are now registered.',
          detail: 'After a few seconds you\'ll be redirected to log in page'
        });
        setTimeout(() => {
          this.router.navigate(['log-in']);
        }, 3000);
      }, (error: HttpErrorResponse) => {
        console.error(error);
        this.messageService.add({
          severity: 'danger',
          summary: 'Something went wrong, try again'
        });
      });
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
}
