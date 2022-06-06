import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCheckoutDialogComponent } from './confirm-checkout-dialog.component';

describe('ConfirmCheckoutDialogComponent', () => {
  let component: ConfirmCheckoutDialogComponent;
  let fixture: ComponentFixture<ConfirmCheckoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCheckoutDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCheckoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
