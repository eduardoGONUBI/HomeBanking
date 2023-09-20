import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepositService } from '../deposit.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FailureDialogComponent } from '../failure-dialog/failure-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  amount: number = 0;

  constructor(private dialog: MatDialog, private depositService: DepositService, private router: Router) {}

  deposit() {
    // Get the deposit amount from the 'amount' property or user input
    const depositAmount = this.amount;

    // Call the deposit service to perform the deposit
    this.depositService.deposit(depositAmount).subscribe(
      (response) => {
        // Handle a successful deposit
        if (response.newBalance !== undefined) {
          this.dialog.open(SuccessDialogComponent, {
            data: { title: 'Deposit Successful', message: `New Balance: $${response.newBalance}` }
          });
        } else {
          this.dialog.open(FailureDialogComponent, {
            data: { title: 'Deposit Failed', message: 'An error occurred during the deposit.' }
          });
        }
      },
      (error) => {
        // Handle deposit failure, e.g., show an error message
        console.error('Deposit failed:', error);
        this.dialog.open(FailureDialogComponent, {
          data: { title: 'Deposit Failed', message: 'An error occurred during the deposit.' }
        });
      }
    );
  }

  goBack() {
    // Use the Router to navigate to the welcome page
    this.router.navigate(['/welcome']); // Adjust the route as per your application structure
  }

}
