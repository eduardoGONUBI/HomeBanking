import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor() {}

  // Set the JWT token in local storage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get the JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Clear the JWT token from local storage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if the user is authenticated (token exists)
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  // Check if a JWT token is expired
  private isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate === null || expirationDate <= new Date();
  }

  // Get the expiration date from a JWT token
  private getTokenExpirationDate(token: string): Date | null {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      if (decoded && decoded.exp) {
        return new Date(decoded.exp * 1000); // Convert to milliseconds
      }
    } catch (error) {
      return null;
    }
    return null;
  }
}
