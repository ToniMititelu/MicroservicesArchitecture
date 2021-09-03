import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { ListingOut } from '../../models/listing.interface';
import { forkJoin } from 'rxjs';
import { Category } from '../../models/categories.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-listings',
  templateUrl: './admin-listings.component.html',
  styleUrls: ['./admin-listings.component.scss']
})
export class AdminListingsComponent implements OnInit {

  listings: ListingOut[] = [];

  categories: any[] = [];

  platforms: any[] = [];

  priceRange = [0, 100];

  users: Map<string, string> = new Map();

  constructor(readonly listingsService: ListingsService,
              readonly authService: AuthService,
              readonly router: Router) {
  }

  ngOnInit(): void {
    forkJoin([
      this.listingsService.getListings(),
      this.listingsService.getCategories(),
      this.listingsService.getPlatforms(),
      this.authService.getUsers()
    ])
      .subscribe(([listings, categories, platforms, users]) => {
        this.listings = listings;
        this.categories = categories.map(category => {
          return {
            label: category.name,
            value: category.name
          };
        });
        this.platforms = platforms.map(platform => {
          return {
            label: platform.full_name,
            value: platform.code
          };
        });
        users.forEach(user => {
          this.users.set(user.id || user._id, user.userName);
        });
      });
  }

  goToEditPage(listing: ListingOut): void {
    this.router.navigate(['/', 'listings', listing.id, 'update']);
  }

}
