import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { ListingOut } from '../../models/listing.interface';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { forkJoin } from 'rxjs';
import { ShipmentService } from '../../services/shipment.service';
import { Address } from '../../models/address.interface';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit {
  options = {
    center: {lat: 36.890257, lng: 30.707417},
    zoom: 12
  };

  listingId: number;

  listing: ListingOut;

  owner: User;

  loading = false;

  images: any[] = [];

  address: Address;

  constructor(readonly route: ActivatedRoute,
              readonly router: Router,
              readonly listingsService: ListingsService,
              readonly shipmentService: ShipmentService,
              readonly userService: UserService,) {
    this.route.paramMap.subscribe(paramMap => {
      this.listingId = Number(paramMap.get('id'));
    });
  }

  ngOnInit(): void {
    this.loading = true;
    forkJoin([this.listingsService.getListing(this.listingId),
      this.listingsService.getListingsImages(this.listingId)])
      .subscribe(async ([listing, images]) => {
        this.listing = listing;

        forkJoin([this.userService.getUser(listing.user_id), this.shipmentService.getUserAddress(listing.user_id)])
          .subscribe(([user, addresses]) => {
            console.log(user);
            this.owner = user;
            if (addresses.length > 0) {
              this.address = addresses[0];
            }
            this.loading = false;
          });

        this.images = images;
        this.images.push(...images);
        this.images.push(...images);
      }, (error) => {
        console.error(error);
      });
  }

}
