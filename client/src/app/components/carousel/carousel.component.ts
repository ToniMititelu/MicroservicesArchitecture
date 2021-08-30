import { Component, OnInit } from '@angular/core';
import {ListingsService} from '../../services/listings.service';
import {ListingOut} from '../../models/listing.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  listings: ListingOut[];
  responsiveOptions;

  favorites = new Map();

  constructor(readonly listingsService: ListingsService,
              readonly router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.listingsService.getListings()
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

  addFavourite(listingId: number): void {
    this.listingsService.addFavourite({listing_id: listingId})
      .subscribe((response) => {
        this.favorites.set(response.listing_id, response.id);
      });
  }

  removeFavourite(listingId: number): void {
    if (!this.favorites.has(listingId)) {
      return;
    }
    const favouriteId = this.favorites.get(listingId);
    this.listingsService.removeFavourite(favouriteId)
      .subscribe((response) => {
        this.favorites.delete(listingId);
      });
  }

  goToDetailPage(listingId: number): void {
    this.router.navigate(['/listings', listingId, 'details']);
  }

  goToCreateOrderPage(listingId: number): void {
    this.router.navigate(['/orders', 'create'], {queryParams: {listing: listingId}});
  }

  getImage(listing: ListingOut): string {
    if (!listing.image_set.length) {
      return 'assets/logo.png';
    }
    return this.listingsService.getImageSrc(listing.image_set[0].image);
  }

}
