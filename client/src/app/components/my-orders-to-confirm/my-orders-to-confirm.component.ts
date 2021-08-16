import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.interface';
import { OrdersService } from '../../services/orders.service';
import { ListingsService } from '../../services/listings.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-orders-to-confirm',
  templateUrl: './my-orders-to-confirm.component.html',
  styleUrls: ['./my-orders-to-confirm.component.scss']
})
export class MyOrdersToConfirmComponent implements OnInit {

  orders: Order[] = [];

  listingMap = new Map();

  loading = false;

  constructor(readonly ordersService: OrdersService,
              readonly listingsService: ListingsService,
              readonly messageService: MessageService,
              readonly confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.loading = true;
    forkJoin([this.ordersService.getOrdersForMyConfirmation(), this.listingsService.getListings()])
      .subscribe(([orders, listings]) => {
        this.orders = orders;
        orders.forEach(order => {
          listings.forEach(listing => {
            if (order.listingId === listing.id) {
              this.listingMap.set(order._id, listing);
              return;
            }
          });
        });
        this.loading = false;
      });
  }

  getListingName(orderId: string): string {
    return this.listingMap.get(orderId).name;
  }

  getListingId(orderId: string): string {
    return this.listingMap.get(orderId).id;
  }

  acceptOrder(orderId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to accept this order? This action will send it for shipment',
      accept: () => {
        this.ordersService.confirmOrder(orderId)
          .subscribe((response) => {
            this.messageService.add({summary: 'Order confirmed', severity: 'success'});
          }, error => this.messageService.add({summary: 'Something went wrong', severity: 'danger'}));
      }
    });
  }

  deleteOrder(orderId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      accept: () => {
        this.ordersService.deleteOrder(orderId)
          .subscribe((response) => {
            this.orders = this.orders.filter(order => order._id !== orderId);
          }, error => console.error(error));
      }
    });
  }

}
