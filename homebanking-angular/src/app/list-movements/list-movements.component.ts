import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovementsDialogComponent } from '../movements-dialog/movements-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-movements',
  templateUrl: './list-movements.component.html',
  styleUrls: ['./list-movements.component.css']
})
export class ListMovementsComponent {
  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router) {}

  showWithdraws() {
    // Get the JWT token from local storage
    const token = localStorage.getItem('token');
  
    if (token) {
      // Set up headers with the token for authentication
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      // Make a GET request to fetch the user's data including withdrawal history
      this.http.get<any[]>('http://localhost:3000/api/getUserData', { headers }).subscribe(
        (userData) => {
          // Assuming that the user data for the currently logged-in user is at index 0
          const loggedInUser = userData.find(user => user.username === this.extractUsernameFromToken(token));
          if (loggedInUser) {
            const withdrawalHistory = loggedInUser.withdrawalHistory; // Assuming withdrawalHistory is a property in the user object
            const dialogRef = this.dialog.open(MovementsDialogComponent, {
              data: { title: 'List of Withdrawals', movements: withdrawalHistory },
            });
          } else {
            console.error('Logged-in user not found in response data');
            // Handle the case where the logged-in user is not in the response
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
          // Handle authentication or other errors here
        }
      );
    } else {
      // Handle the case where there is no token (user not authenticated)
      console.error('No token found. User is not authenticated.');
      // You may want to redirect to the login page or handle this differently
    }
  }
  

  showDeposits() {
    // Get the JWT token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Set up headers with the token for authentication
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Make a GET request to fetch the user's data including deposit history
      this.http.get<any[]>('http://localhost:3000/api/getUserData', { headers }).subscribe(
        (userData) => {
          // Assuming that the user data for the currently logged-in user is at index 0
          const loggedInUser = userData.find(user => user.username === this.extractUsernameFromToken(token));
          if (loggedInUser) {
            const depositHistory = loggedInUser.depositHistory; // Assuming depositHistory is a property in the user object
            const dialogRef = this.dialog.open(MovementsDialogComponent, {
              data: { title: 'List of Deposits', movements: depositHistory },
            });
          } else {
            console.error('Logged-in user not found in response data');
            // Handle the case where the logged-in user is not in the response
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
          // Handle authentication or other errors here
        }
      );
    } else {
      // Handle the case where there is no token (user not authenticated)
      console.error('No token found. User is not authenticated.');
      // You may want to redirect to the login page or handle this differently
    }
  }

  goBack() {
    // Use the Router to navigate to the welcome page
    this.router.navigate(['/welcome']); // Adjust the route as per your application structure
  }

  // Helper function to extract username from JWT token
  private extractUsernameFromToken(token: string): string {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.username;
    } catch (error) {
      console.error('Error extracting username from token:', error);
      return '';
    }
  }
}
