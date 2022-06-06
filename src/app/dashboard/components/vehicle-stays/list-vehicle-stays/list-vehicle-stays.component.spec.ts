import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVehicleStaysComponent } from './list-vehicle-stays.component';

describe('ListVehicleStaysComponent', () => {
  let component: ListVehicleStaysComponent;
  let fixture: ComponentFixture<ListVehicleStaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVehicleStaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVehicleStaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
