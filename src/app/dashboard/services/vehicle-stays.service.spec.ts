import { TestBed } from '@angular/core/testing';

import { VehicleStaysService } from './vehicle-stays.service';

describe('VehicleStaysService', () => {
  let service: VehicleStaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleStaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
