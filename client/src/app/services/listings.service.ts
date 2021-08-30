import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '../models/platform';
import { Currency } from '../models/currency.interface';
import { Category } from '../models/categories.interface';
import { ListingIn, ListingOut } from '../models/listing.interface';
import { FavouriteIn, FavouriteOut } from '../models/favourite.interface';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  baseUrl = 'http://localhost:8080/api/listings/v1';
  baseImageUrl = 'http://localhost:8080/api/listings';

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

  getListings(completion?: string): Observable<ListingOut[]> {
    const url = `${this.baseUrl}/listings/${completion || ''}`;
    return this.http.get<ListingOut[]>(url);
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

  uploadImages(listingId: number, images: any[]): Observable<any> {
    const formData: FormData = new FormData();
    images.forEach(image => {
      formData.append('files', image);
    });
    const url = `${this.baseUrl}/listings/${listingId}/images/`;
    return this.http.post(url, formData);
  }

  getListingsImages(listingId: number): Observable<string[]> {
    const url = `${this.baseUrl}/listings/${listingId}/images/`;
    return this.http.get<string[]>(url);
  }

  getImage(imageName: string): Observable<any> {
    const url = `${this.baseImageUrl}/${imageName}/`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getImageSrc(imageName: string): string {
    return `${this.baseImageUrl}${imageName}/`;
  }

  deleteListing(id: number): Observable<any> {
    const url = `${this.baseUrl}/listings/${id}/`;
    return this.http.delete(url);
  }

  addFavourite(favourite: FavouriteIn): Observable<FavouriteOut> {
    const url = `${this.baseUrl}/favorites/`;
    return this.http.post<FavouriteOut>(url, favourite);
  }

  removeFavourite(id: number): Observable<any> {
    const url = `${this.baseUrl}/favorites/${id}/`;
    return this.http.delete(url);
  }

  getFavorites(): Observable<FavouriteOut[]> {
    const url = `${this.baseUrl}/favorites/mine/`;
    return this.http.get<FavouriteOut[]>(url);
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
