import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { ListingOut } from '../../models/listing.interface';

@Component({
  selector: 'app-listings-mine',
  templateUrl: './listings-mine.component.html',
  styleUrls: ['./listings-mine.component.scss']
})
export class ListingsMineComponent implements OnInit {

  constructor(readonly listingsService: ListingsService) {
  }

  ngOnInit(): void {
  }

}
