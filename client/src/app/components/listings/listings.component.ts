import { Component, Input, OnInit } from '@angular/core';
import { ListingOut } from '../../models/listing.interface';
import { ListingsService } from '../../services/listings.service';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { FavouriteOut } from '../../models/favourite.interface';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  @Input() listings: ListingOut[];

  @Input() completion;

  favorites: number[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(readonly listingsService: ListingsService) {
  }

  ngOnInit(): void {
    forkJoin([this.listingsService.getListings(this.completion), this.listingsService.getFavorites()])
      .subscribe(([listings, favorites]) => {
        if (!this.listings) {
          this.listings = listings;
        }
        this.favorites = favorites.map(favourite => {
          return favourite.listing_id;
        });
      }, (error) => {
        console.error(error);
      });
  }

  addFavourite(listingId: number): void {
    this.listingsService.addFavourite({listing_id: listingId})
      .subscribe((response) => {
        this.favorites.push(response.listing_id);
      });
  }

  removeFavourite(listingId: number): void {
    this.listingsService.removeFavourite(listingId)
      .subscribe((response) => {
        this.favorites.splice(this.favorites.indexOf(listingId), 1);
      });
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
