import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { ListingOut } from '../../models/listing.interface';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';

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

  constructor(readonly route: ActivatedRoute,
              readonly router: Router,
              readonly listingsService: ListingsService,
              readonly userService: UserService,) {
    this.route.paramMap.subscribe(paramMap => {
      this.listingId = Number(paramMap.get('id'));
    });
  }

  ngOnInit(): void {
    this.listingsService.getListing(this.listingId)
      .subscribe((response) => {
        this.listing = response;
        this.userService.getUser(response.user_id)
          .subscribe((user) => {
            console.log(user);
            this.owner = user;
          }, (error) => {
            console.error(error);
          });
      }, (error) => {
        console.error(error);
      });
  }

}
