import {Component, OnInit} from '@angular/core';
import {ListingsService} from '../../services/listings.service';
import {forkJoin} from 'rxjs';
import {ListingIn, ListingOut} from '../../models/listing.interface';
import {Message, MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-update-listings',
  templateUrl: './create-update-listings.component.html',
  styleUrls: ['./create-update-listings.component.scss']
})
export class CreateUpdateListingsComponent implements OnInit {

  listingId: number | undefined;
  uploadedFiles: any[] = [];
  maxFileSize = 100000;
  multiple = true;
  platformsData = [];
  currenciesData = [];
  categoriesData = [];
  newListing: ListingIn = {};
  currentListing: ListingOut;
  platform: any;
  mandatoryFields = ['name', 'description', 'price', 'category_id', 'currency_code', 'platform_code'];

  constructor(readonly listingsService: ListingsService,
              readonly messageService: MessageService,
              readonly route: ActivatedRoute,
              readonly router: Router) {
    this.route.paramMap.subscribe(paramMap => {
      this.listingId = paramMap.has('id') ? Number(paramMap.get('id')) : undefined;
    });
  }

  ngOnInit(): void {
    forkJoin([
      this.listingsService.getPlatforms(),
      this.listingsService.getCategories(),
      this.listingsService.getCurrencies()
    ]).subscribe(
      ([platforms, categories, currencies]) => {
        this.platformsData = platforms.map(platform => {
          return {
            code: platform.code,
            name: platform.full_name
          };
        });
        this.categoriesData = categories.map(category => {
          return {
            code: category.id,
            name: category.name
          };
        });
        this.currenciesData = currencies.map(currency => {
          return {
            code: currency.code,
            name: currency.symbol
          };
        });

        if (this.listingId) {
          this.listingsService.getListing(this.listingId)
            .subscribe(
              (response) => {
                this.currentListing = response;
                this.newListing = this.listingsService.convertOutListingToIn(response);
              }, (error) => {
                console.error();
              }
            );
        }
      }
    );
  }

  onUpload(event): void {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

  }

  submit(event: Event): void {
    const errors: Message[] = [];
    this.mandatoryFields.forEach(field => {
      if (!this.newListing[field]) {
        errors.push({severity: 'error', summary: 'Field required', detail: `${field} is required`});
      }
    });

    if (errors.length) {
      this.messageService.addAll(errors);
      return;
    }

    (this.currentListing ?
      this.listingsService.updateListing(this.newListing, this.currentListing.id) : this.listingsService.createListing(this.newListing))
      .subscribe(
        (response) => {
          this.currentListing = response;
          this.messageService.add({
            severity: 'success',
            summary: 'Request succeeded',
            detail: `Listing ${this.currentListing.name} saved successfully`
          });
        }, (error) => {
          console.error(error);
        }
      );
  }

  cancel(event: Event): void {
    this.router.navigate(['home']);
  }

  delete(event: Event): void {
    this.listingsService.deleteListing(this.listingId)
      .subscribe(
        (response) => {
          this.router.navigate(['home']);
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Request failed',
            detail: 'Could not delete listing, please try again later'
          });
        }
      );
  }
}