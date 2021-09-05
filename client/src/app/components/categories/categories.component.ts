import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/categories.interface';
import { ListingsService } from '../../services/listings.service';
import { forkJoin } from 'rxjs';
import { Platform } from '../../models/platform';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  platforms: Platform[] = [];

  constructor(readonly listingsService: ListingsService) { }

  ngOnInit(): void {
    forkJoin([this.listingsService.getCategories(), this.listingsService.getPlatforms()])
      .subscribe(([categories, platforms]) => {
        this.categories = categories;
        this.platforms = platforms;
      });
  }

  getQueryParamsPlatforms(platform: Platform): any {
    return {platform: platform.code};
  }

  getQueryParamsCategories(category: Category): any {
    return {category: category.name};
  }
}
