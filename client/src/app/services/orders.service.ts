import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = `http://localhost:8080/api/orders`;

  constructor(readonly http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    const url = `${this.baseUrl}/`;
    return this.http.get<Order[]>(url);
  }

  getMyOrders(): Observable<Order[]> {
    const url = `${this.baseUrl}/mine/`;
    return this.http.get<Order[]>(url);
  }

  getOrdersForMyConfirmation(): Observable<Order[]> {
    const url = `${this.baseUrl}/mine/confirmation`;
    return this.http.get<Order[]>(url);
  }

  getOrder(orderId: string): Observable<Order> {
    const url = `${this.baseUrl}/${orderId}/`;
    return this.http.get<Order>(url);
  }

  createOrder(order: Order): Observable<Order> {
    const url = `${this.baseUrl}/`;
    return this.http.post<Order>(url, order);
  }

  confirmOrder(orderId: string): Observable<any> {
    const url = `${this.baseUrl}/${orderId}/confirm`;
    return this.http.get(url);
  }

  deleteOrder(orderId: string): Observable<any> {
    const url = `${this.baseUrl}/${orderId}/`;
    return this.http.delete(url);
  }

}
