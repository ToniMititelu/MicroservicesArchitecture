import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  baseUrl = `http://localhost:8080/api/shipments`;

  constructor(http: HttpClient) { }

  getAddress(addressId: string) {
    const url = `${this.baseUrl}/addresses/${addressId}/`;
  }
}
