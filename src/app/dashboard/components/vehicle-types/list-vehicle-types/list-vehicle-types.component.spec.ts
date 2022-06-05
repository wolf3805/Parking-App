import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVehicleTypesComponent } from './list-vehicle-types.component';

describe('ListVehicleTypesComponent', () => {
  let component: ListVehicleTypesComponent;
  let fixture: ComponentFixture<ListVehicleTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVehicleTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVehicleTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
