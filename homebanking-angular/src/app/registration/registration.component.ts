import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FailureDialogComponent } from '../failure-dialog/failure-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authi.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    if (this.email === '' || this.username === '' || this.password === '' || this.confirmPassword === '') {
      alert('Please fill all fields');
    } else if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
    } else {
      const newUser = {
        email: this.email,
        username: this.username,
        password: this.password,
        depositHistory: [],
        withdrawalHistory:[],
      };

      this.http.post<any>('http://localhost:3000/api/register', newUser).subscribe(
        (response) => {
          // Handle registration success, e.g., show a success message
          const dialogRef = this.dialog.open(SuccessDialogComponent, {
            data: { title: 'Registration Successful' },
          });

          dialogRef.afterClosed().subscribe(() => {
            // Navigate to the login page
            this.router.navigate(['/login']);
          });
        },
        (error) => {
          alert('User or Email already exists');
        }
      );
    }
  }
}
