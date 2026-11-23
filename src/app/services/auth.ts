
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  scope: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9081/api/v1/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      this.apiUrl,
      credentials
    ).pipe(
      tap(response => {
        const now = Date.now();

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('token_type', response.token_type);

        localStorage.setItem(
          'access_token_expiry',
          String(now + response.expires_in * 1000)
        );

        localStorage.setItem(
          'refresh_token_expiry',
          String(now + response.refresh_expires_in * 1000)
        );
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    const expiry = Number(localStorage.getItem('access_token_expiry'));

    return !!token && !!expiry && Date.now() < expiry;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('access_token_expiry');
    localStorage.removeItem('refresh_token_expiry');
  }
}
