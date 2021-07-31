import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsMineComponent } from './listings-mine.component';

describe('ListingsMineComponent', () => {
  let component: ListingsMineComponent;
  let fixture: ComponentFixture<ListingsMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsMineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
