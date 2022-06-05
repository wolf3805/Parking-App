import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { VehiclesResponse } from '../models/VehiclesResponse';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  create(data: object) {
    return this.http.post<VehiclesResponse>('/api/vehicles', data);
  }

  getAll(params: object = {}) {
    const formattedParams = new HttpParams({
      fromObject: { ...params }
    });

    return this.http.get<VehiclesResponse>('/api/vehicles', { params: formattedParams });
  }

  delete(id: number) {
    return this.http.delete<VehiclesResponse>(`/api/vehicles/${id}`);
  }

}
