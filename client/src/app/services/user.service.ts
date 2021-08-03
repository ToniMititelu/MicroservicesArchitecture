import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080/api/auth';

  constructor(readonly http: HttpClient,
              readonly localStorageService: LocalStorageService) {
  }

  getUserData(): Observable<User> {
    const url = `${this.baseUrl}/me/`;
    return this.http.get<User>(url);
  }

  getUser(id: string): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<User>(url);
  }
}
