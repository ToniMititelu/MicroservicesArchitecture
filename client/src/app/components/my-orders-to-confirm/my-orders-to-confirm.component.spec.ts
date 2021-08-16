import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersToConfirmComponent } from './my-orders-to-confirm.component';

describe('MyOrdersToConfirmComponent', () => {
  let component: MyOrdersToConfirmComponent;
  let fixture: ComponentFixture<MyOrdersToConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrdersToConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersToConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
