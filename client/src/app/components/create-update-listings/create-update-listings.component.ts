import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {ListingsService} from '../../services/listings.service';

@Component({
  selector: 'app-create-update-listings',
  templateUrl: './create-update-listings.component.html',
  styleUrls: ['./create-update-listings.component.scss']
})
export class CreateUpdateListingsComponent implements OnInit {

  uploadedFiles: any[] = [];
  maxFileSize = 100000;
  multiple = true;
  platformsData = [];

  constructor(readonly listingsService: ListingsService) {}

  ngOnInit(): void {
    this.listingsService.getPlatforms()
      .subscribe((response) => {
        this.platformsData = response.map(platform => {
          return {
            code: platform.code,
            name: platform.full_name
          };
        });
      }, error => {

      });
  }

  onUpload(event): void {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

  }
}
