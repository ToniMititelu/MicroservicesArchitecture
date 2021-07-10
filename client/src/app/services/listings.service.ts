import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Platform} from '../models/platform';
import {Currency} from '../models/currency.interface';
import {Category} from '../models/categories.interface';
import {ListingIn, ListingOut} from '../models/listing.interface';

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

  getCurrencies(): Observable<Currency[]> {
    const url = `${this.baseUrl}/currencies/`;
    return this.http.get<Currency[]>(url);
  }

  getCategories(): Observable<Category[]> {
    const url = `${this.baseUrl}/categories/`;
    return this.http.get<Category[]>(url);
  }

  getListing(id: number): Observable<ListingOut> {
    const url = `${this.baseUrl}/listings/${id}/`;
    return this.http.get<ListingOut>(url);
  }

  createListing(listing: ListingIn): Observable<ListingOut> {
    const url = `${this.baseUrl}/listings/`;
    return this.http.post<ListingOut>(url, listing);
  }

  updateListing(listing: ListingIn, id: number): Observable<ListingOut> {
    const url = `${this.baseUrl}/listings/${id}/`;
    return this.http.put<ListingOut>(url, listing);
  }

  deleteListing(id: number): Observable<any> {
    const url = `${this.baseUrl}/listings/${id}/`;
    return this.http.delete(url);
  }

  convertOutListingToIn(listing: ListingOut): ListingIn {
    return {
      name: listing.name,
      description: listing.description,
      price: listing.price,
      is_negotiable: listing.is_negotiable,
      is_sealed: listing.is_sealed,
      is_digital: listing.is_digital,
      category_id: listing.category.id,
      currency_code: listing.currency.code,
      platform_code: listing.platform.code,
    };
  }
}
