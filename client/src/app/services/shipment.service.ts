import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.interface';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  baseUrl = `http://localhost:8080/api/shipments`;

  constructor(readonly http: HttpClient) {
  }

  getAddress(addressId: string): Observable<Address> {
    const url = `${this.baseUrl}/addresses/${addressId}/`;
    return this.http.get<Address>(url);
  }

  getAddresses(): Observable<Address[]> {
    const url = `${this.baseUrl}/addresses/`;
    return this.http.get<Address[]>(url);
  }

  getMyAddresses(): Observable<Address[]> {
    const url = `${this.baseUrl}/addresses/mine/`;
    return this.http.get<Address[]>(url);
  }

  getMyDefaultAddress(): Observable<Address> {
    const url = `${this.baseUrl}/addresses/mine/default/`;
    return this.http.get<Address>(url);
  }

  createAddress(address: Address): Observable<Address> {
    const url = `${this.baseUrl}/addresses/`;
    return this.http.post<Address>(url, address);
  }

  editAddress(addressId: string, address: Address): Observable<Address> {
    const url = `${this.baseUrl}/addresses/${addressId}/`;
    return this.http.put<Address>(url, address);
  }

  deleteAddress(addressId: string): Observable<any> {
    const url = `${this.baseUrl}/addresses/${addressId}/`;
    return this.http.delete(url);
  }
}
