import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {User, UserLogIn, UserRegister} from '../models/user.interface';
import {Token} from '../models/token.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `http://localhost:8080/api/auth`;

  constructor(readonly http: HttpClient,
              readonly localStorageService: LocalStorageService) {
  }

  logIn(user: UserLogIn): Observable<Token> {
    const url = `${this.baseUrl}/login/`;
    return this.http.post<Token>(url, user);
  }

  isLoggedIn(): boolean {
    return this.localStorageService.hasItem('access_token') && this.localStorageService.hasItem('refresh_token');
  }

  isAdmin(): boolean {
    return this.localStorageService.getItem('role') === 'ADMIN';
  }

  register(user: UserRegister): Observable<User> {
    const url = `${this.baseUrl}/register/`;
    return this.http.post<User>(url, user);
  }

  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users/`;
    return this.http.get<User[]>(url);
  }

  getUserData(): Observable<User> {
    const url = `${this.baseUrl}/me/`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const id = user._id || user.id;
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.put<User>(url, user);
  }

  logOut(): void {
    this.localStorageService.clearLocalStorage();
  }

  refreshToken(refreshToken: string): boolean {
    const url = `${this.baseUrl}/refresh-token/`;
    this.http.post(url, {refresh_token: refreshToken})
      .subscribe((response: Token) => {
        this.localStorageService.setItem('access_token', response.access_token);
        this.localStorageService.setItem('refresh_token', response.refresh_token);
        return true;
      }, (error: HttpErrorResponse) => {
        console.error(error);
        return false;
      });
    return false;
  }
}
