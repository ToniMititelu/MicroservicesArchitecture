import {Component, OnInit} from '@angular/core';
import {ListingOut} from '../../models/listing.interface';
import {ListingsService} from '../../services/listings.service';
import {SelectItem} from 'primeng/api';

interface Product {
  name: string;
  description: string;
  rating: number;
  category: string;
  price: number;
  inventoryStatus: string;
}

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  listings: ListingOut[];

  products: Product[] = [
    {
      name: 'test',
      description: 'test',
      rating: 3,
      category: 'test',
      price: 45,
      inventoryStatus: 'IN STOCK'
    }
  ];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(readonly listingsService: ListingsService) {
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
