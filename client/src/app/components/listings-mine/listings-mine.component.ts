import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { ListingOut } from '../../models/listing.interface';

@Component({
  selector: 'app-listings-mine',
  templateUrl: './listings-mine.component.html',
  styleUrls: ['./listings-mine.component.scss']
})
export class ListingsMineComponent implements OnInit {

  listings: ListingOut[];

  constructor(readonly listingsService: ListingsService) {
  }

  ngOnInit(): void {
    this.listingsService.getListings('mine/')
      .subscribe(
        (response) => {
          this.listings = [];
          for (let i = 0; i < 4; i++) {
            this.listings.push(...response);
          }
          // this.listings = response;
        }, (error) => {
          console.error(error);
        }
      );
  }

}
