import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../../services/listings.service';
import { forkJoin } from 'rxjs';
import { ListingIn, ListingOut } from '../../models/listing.interface';
import { Message, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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
  images = [];

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
          forkJoin([this.listingsService.getListing(this.listingId), this.listingsService.getListingsImages(this.listingId)])
            .subscribe(async ([listing, images]) => {
              this.currentListing = listing;
              console.log(listing);
              this.newListing = this.listingsService.convertOutListingToIn(listing);
              for (const image of listing.image_set) {
                const p = new Promise(((resolve, reject) => {
                  this.listingsService.getImage(image.image)
                    .subscribe((response) => {
                      const f = new File([response], image.image, {type: response.type});
                      resolve(f);
                    }, (error) => reject(error));
                }));

                try {
                  this.images.push(await p);
                } catch (e) {
                  console.error(e);
                }
              }
              this.uploadedFiles = this.images;
            });
        }
      }
    );
  }

  updateFiles(event): void {
    this.uploadedFiles = event.currentFiles;
  }

  removeFile(event): void {
    const name = event.file.name;
    this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== name);
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
          const newFiles = this.uploadedFiles.filter(file => this.oldImage(file));
          if (newFiles.length > 0) {
            this.listingsService.uploadImages(this.currentListing.id, this.uploadedFiles)
              .subscribe((responseImage) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Request succeeded',
                  detail: `Listing ${this.currentListing.name} saved successfully`
                });
              }, (error) => {
                console.error(error);
              });
          }
        }, (error) => {
          console.error(error);
        }
      );
  }

  cancel(event: Event): void {
    this.router.navigate(['home']);
  }

  oldImage(file): boolean {
    return !this.images.some(image => image.name === file.name);
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
