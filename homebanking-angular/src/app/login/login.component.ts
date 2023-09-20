import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/api/login', loginData).subscribe(
      (response) => {
        if (response.token) {
          // Store the token in local storage
          localStorage.setItem('token', response.token);
          this.isLoggedIn = true;
          this.router.navigate(['/welcome']);
        } else {
          alert('Invalid username or password');
        }
      },
      (error) => {
        console.error('Error during login:', error);
        alert('An error occurred during login');
      }
    );
  }
}
