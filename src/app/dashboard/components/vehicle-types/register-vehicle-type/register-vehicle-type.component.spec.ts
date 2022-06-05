import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehicleTypeComponent } from './register-vehicle-type.component';

describe('RegisterVehicleTypeComponent', () => {
  let component: RegisterVehicleTypeComponent;
  let fixture: ComponentFixture<RegisterVehicleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVehicleTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
