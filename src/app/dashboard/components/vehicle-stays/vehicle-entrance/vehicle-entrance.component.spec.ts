import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEntranceComponent } from './vehicle-entrance.component';

describe('VehicleEntranceComponent', () => {
  let component: VehicleEntranceComponent;
  let fixture: ComponentFixture<VehicleEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleEntranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
