import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAddressComponent } from './create-edit-address.component';

describe('CreateEditAddressComponent', () => {
  let component: CreateEditAddressComponent;
  let fixture: ComponentFixture<CreateEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
