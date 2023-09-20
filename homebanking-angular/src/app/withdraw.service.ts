import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  withdraw(amount: number): Observable<any> {
    // Get the JWT token from local storage
    const token = localStorage.getItem('token');
  
    // Create headers with the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Create an object to send as the request body
    const withdrawalData = {
      amount,
      withdrawalHistory: [], // Initialize withdrawal history as an empty array
    };
  
    // Send a POST request to the server's /api/withdraw endpoint with headers
    return this.http.post<any>(`${this.baseUrl}/api/withdraw`, withdrawalData, { headers });
  }
}
