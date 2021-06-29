import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, UserLogIn } from 'src/app/models/user.interface';
import { Token } from 'src/app/models/token.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-test-auth',
  templateUrl: './test-auth.component.html',
  styleUrls: ['./test-auth.component.scss']
})
export class TestAuthComponent implements OnInit {

  user: User;

  constructor(readonly authService: AuthService,
              readonly localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  logIn(): void {
    this.authService.logIn({email: 'admin123@gmail.com', password: 'admin123'})
        .subscribe((response: Token) => {
          this.localStorageService.setItem('access_token', response.access_token);
          this.localStorageService.setItem('refresh_token', response.refresh_token);
        });
  }

  logOut(): void {
    this.localStorageService.clearLocalStorage();
  }

  getUserData() {
    this.authService.getUserData()
        .subscribe((response: User) => this.user = response, (err) => console.error(err));
  }

}
