import { Component, Input, OnInit } from '@angular/core';
import { ListingOut } from '../../models/listing.interface';
import { ListingsService } from '../../services/listings.service';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { FavouriteOut } from '../../models/favourite.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  @Input() completion;
  @Input() mine = false;

  listings: ListingOut[];

  favorites = new Map();

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(readonly listingsService: ListingsService,
              readonly router: Router) {
  }

  ngOnInit(): void {
    forkJoin([this.listingsService.getListings(this.completion), this.listingsService.getFavorites()])
      .subscribe(([listings, favorites]) => {
        if (!this.listings) {
          this.listings = listings;
        }
        favorites.forEach(favourite => {
          this.favorites.set(favourite.listing_id, favourite.id);
        });
      }, (error) => {
        console.error(error);
      });
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

  goToUpdatePage(listingId: number): void {
    this.router.navigate(['/listings', listingId, 'update']);
  }

  onSortChange(event): void {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
