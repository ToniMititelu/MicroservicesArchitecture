import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit {
  options = {
    center: {lat: 36.890257, lng: 30.707417},
    zoom: 12
  };

  constructor() { }

  ngOnInit(): void {
  }

}
