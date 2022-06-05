import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleStaysComponent } from './vehicle-stays.component';

describe('VehicleStaysComponent', () => {
  let component: VehicleStaysComponent;
  let fixture: ComponentFixture<VehicleStaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleStaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleStaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
