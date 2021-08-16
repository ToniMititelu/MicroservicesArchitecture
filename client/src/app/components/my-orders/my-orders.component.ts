import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ListingsService } from '../../services/listings.service';
import { forkJoin } from 'rxjs';
import { Order } from '../../models/order.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

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
    forkJoin([this.ordersService.getMyOrders(), this.listingsService.getListings()])
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
