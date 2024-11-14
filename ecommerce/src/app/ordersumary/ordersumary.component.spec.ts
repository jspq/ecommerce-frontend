import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersumaryComponent } from './ordersumary.component';

describe('OrdersumaryComponent', () => {
  let component: OrdersumaryComponent;
  let fixture: ComponentFixture<OrdersumaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersumaryComponent]
    });
    fixture = TestBed.createComponent(OrdersumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
