import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');

  private readonly TOKEN: string = 'TOKEN';

  constructor(
    private http: HttpClient
  ) { }
  
  setLoggedInStatus(status: boolean): void {
    this.loggedInStatus = status;

    if (!this.loggedInStatus) {
      sessionStorage.removeItem(this.TOKEN);
    }
    
    sessionStorage.setItem('loggedIn', status.toString())
  }

  get isLoggedIn(): boolean {
    return JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus)
  }

  saveToken( token: string): void {
    sessionStorage.setItem(this.TOKEN, token);
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN) ?? '';
  }

  login(user: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', user);
  }
}
