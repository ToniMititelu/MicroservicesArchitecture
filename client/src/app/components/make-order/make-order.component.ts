import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { ShipmentService } from '../../services/shipment.service';
import { UserService } from '../../services/user.service';
import { Address } from '../../models/address.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ListingOut } from '../../models/listing.interface';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order.interface';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {

  loading = false;

  listingId: number;

  listing: ListingOut;

  addresses: Address[];

  addressesData: any[];

  images: string[];

  addressId: string;

  order: Order;

  constructor(readonly route: ActivatedRoute,
              readonly router: Router,
              readonly listingsService: ListingsService,
              readonly shipmentService: ShipmentService,
              readonly orderService: OrdersService,
              readonly userService: UserService) {
    this.route.queryParamMap.subscribe(queryParam => {
      this.listingId = Number(queryParam.get('listing'));
    });
  }

  ngOnInit(): void {
    this.loading = true;
    forkJoin([
      this.shipmentService.getMyAddresses(),
      this.listingsService.getListing(this.listingId),
      this.listingsService.getListingsImages(this.listingId)
    ])
      .subscribe(([addresses, listing, images]) => {
        this.addresses = addresses;
        this.listing = listing;
        this.images = images;

        this.addressesData = addresses.map(address => {
          return {
            code: address._id,
            name: `${address.street} ${address.number}, ${address.city}, ${address.country}`,
          };
        });

        this.loading = false;
      }, (error: HttpErrorResponse) => console.error(error));
  }

  sendOrder(): void {
    this.order = {
      listingId: this.listingId,
      totalAmount: this.listing.price,
      currency: this.listing.currency.symbol,
      shippingAddressId: this.addressId,
      ownerId: this.listing.user_id,
    };
    this.orderService.createOrder(this.order)
      .subscribe((response: Order) => {
        this.router.navigate(['orders/mine']);
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

}
