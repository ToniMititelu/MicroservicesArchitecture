import { Component, OnInit } from '@angular/core';
import { ListingOut } from '../../models/listing.interface';
import { ListingsService } from '../../services/listings.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  listings: ListingOut[];

  constructor(readonly listingsService: ListingsService) {
  }

  ngOnInit(): void {
  }

}
