import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { ListingOut } from '../../models/listing.interface';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { forkJoin } from 'rxjs';

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

  constructor(readonly route: ActivatedRoute,
              readonly router: Router,
              readonly listingsService: ListingsService,
              readonly userService: UserService,) {
    this.route.paramMap.subscribe(paramMap => {
      this.listingId = Number(paramMap.get('id'));
    });
  }

  ngOnInit(): void {
    this.loading = true;
    forkJoin([this.listingsService.getListing(this.listingId), this.listingsService.getListingsImages(this.listingId)])
      .subscribe(async ([listing, images]) => {
        this.listing = listing;
        this.userService.getUser(listing.user_id)
          .subscribe((user) => {
            console.log(user);
            this.owner = user;
            this.loading = false;
          }, (error) => {
            console.error(error);
          });

        this.images = images;
        this.images.push(...images);
        this.images.push(...images);
      }, (error) => {
        console.error(error);
      });
  }

}
