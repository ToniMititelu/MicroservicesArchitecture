import { Component, Input, OnInit } from '@angular/core';
import { ListingOut } from '../../models/listing.interface';
import { ListingsService } from '../../services/listings.service';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { FavouriteOut } from '../../models/favourite.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  @Input() completion;
  @Input() mine = false;

  listings: ListingOut[];

  initialListings: ListingOut[];

  favorites = new Map();

  sortOptions: SelectItem[];

  categoryOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  category: string;

  user: string;

  searchQuery: string;

  constructor(readonly listingsService: ListingsService,
              readonly router: Router,
              readonly route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(queryParam => {
      this.category = queryParam.get('category');
      this.user = queryParam.get('user');
      this.searchQuery = queryParam.get('q');
    });
  }

  ngOnInit(): void {
    forkJoin([
      this.listingsService.getListings(this.completion),
      this.listingsService.getFavorites(),
      this.listingsService.getCategories(),
    ])
      .subscribe(([listings, favorites, categories]) => {
        if (!this.listings) {
          this.listings = listings;
          console.log(this.listings);
          this.initialListings = listings;
        }
        favorites.forEach(favourite => {
          this.favorites.set(favourite.listing_id, favourite.id);
        });
        this.categoryOptions = categories.map(category => {
          return {
            label: category.name,
            value: category.name
          };
        });

        if (this.category) {
          this.filterByCategory({value: this.category});
        }

        if (this.user) {
          this.filterByCategory({value: this.user});
        }

        if (this.searchQuery) {
          return;
        }
      }, (error) => {
        console.error(error);
      });

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];
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

  getValueFromEvent(event): string {
    return (event.target as any).value;
  }

  filterByCategory(event): void {
    this.listings = this.initialListings;

    const value = event.value;

    if (!value) {
      return;
    }

    this.updateQueryParams({category: value});

    this.listings = this.listings.filter(listing => listing.category.name === value);
  }

  filterByUser(event): void {
    this.listings = this.initialListings;

    const value = event.value;

    if (!value) {
      return;
    }

    this.listings = this.listings.filter(listing => listing.user_id === value);
  }

  getImageSrc(imageSrc: string): string {
    return this.listingsService.getImageSrc(imageSrc);
  }

  getImage(listing: ListingOut): string {
    if (!listing.image_set.length) {
      return 'assets/logo.png';
    }
    return this.listingsService.getImageSrc(listing.image_set[0].image);
  }

  updateQueryParams(newQueryParams: any): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: newQueryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }
}
