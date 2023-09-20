import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private baseUrl = 'http://localhost:3000'; // Replace with your server's base URL

  constructor(private http: HttpClient) {}

  deposit(amount: number): Observable<any> {
    // Get the JWT token from local storage
    const token = localStorage.getItem('token');

    // Create headers with the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Create an object to send as the request body
    const depositData = { amount };

    // Send a POST request to the server's /api/deposit endpoint with headers
    return this.http.post<any>(`${this.baseUrl}/api/deposit`, depositData, { headers });
  }
}
