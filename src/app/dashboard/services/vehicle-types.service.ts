import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { VehiclesTypesResponse } from 'src/app/models/VehiclesTypesResponse';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypesService {

  constructor(private http: HttpClient) { }

  getAll(params: object = {}) {
    const formattedParams = new HttpParams({
      fromObject: { ...params }
    });

    return this.http.get<VehiclesTypesResponse>('/api/vehicle-types', {params: formattedParams});
  }

}
