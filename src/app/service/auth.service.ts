import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { environment } from './configuration/environment';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register-request.model';
import { LoginRequest } from '../models/login-request.model';
import { Profile } from '../models/profile';
import { User } from '../models/user.model';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/api/auth`; // Make sure you have apiUrl in environment.ts

  private authTokenKey = 'authToken';
  private userDataKey = 'userData'; // Store user data in localStorage

  constructor(private http: HttpClient, private router:Router) {}

  // Register a new user
  registerUser(registerRequest: RegisterRequest): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.authUrl}/register`, registerRequest  );
  }

  // Authenticate user and return token
  loginUser(loginRequest: LoginRequest): Observable<ApiResponse<Profile>> {
    return this.http.post<ApiResponse<Profile>>(`${this.authUrl}/login`, loginRequest);
  }

  logout()
  {
      this.clearAuth();
      this.router.navigate(['/']);
  }


  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem(this.userDataKey) || '{}');
  }

  setUserData(data: any): void {
    localStorage.setItem(this.userDataKey, JSON.stringify(data));
  }

  clearAuth(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userDataKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


}