import { Component, Input, OnInit } from '@angular/core';
import { ListingOut } from '../../models/listing.interface';
import { ListingsService } from '../../services/listings.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  @Input() mine = false;

  listings: ListingOut[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(readonly listingsService: ListingsService) {
  }

  ngOnInit(): void {
    this.listingsService.getListings(this.mine)
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
