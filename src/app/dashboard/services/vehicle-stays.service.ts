import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleStaysResponse } from 'src/app/models/VehiclesStaysResponse';

@Injectable({
  providedIn: 'root'
})
export class VehicleStaysService {

  constructor(private http: HttpClient) { }

  create(data: object) {
    return this.http.post<VehicleStaysResponse>('/api/vehicle-stays', data);
  }

  getAll(params: object = {}) {
    const formattedParams = new HttpParams({
      fromObject: { ...params }
    });

    return this.http.get<VehicleStaysResponse>('/api/vehicle-stays', { params: formattedParams });
  }

  delete(id: number) {
    return this.http.delete<VehicleStaysResponse>(`/api/vehicle-stays/${id}`);
  }

}
