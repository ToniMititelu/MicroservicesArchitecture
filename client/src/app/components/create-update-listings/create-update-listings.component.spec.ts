import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateListingsComponent } from './create-update-listings.component';

describe('CreateUpdateListingsComponent', () => {
  let component: CreateUpdateListingsComponent;
  let fixture: ComponentFixture<CreateUpdateListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
