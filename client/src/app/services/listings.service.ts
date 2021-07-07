import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Platform} from '../models/platform';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  baseUrl = 'http://localhost:8080/api/listings/v1';

  constructor(readonly http: HttpClient) {
  }

  getPlatforms(): Observable<Platform[]> {
    const url = `${this.baseUrl}/platforms/`;
    return this.http.get<Platform[]>(url);
  }
}
