import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawService } from '../withdraw.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FailureDialogComponent } from '../failure-dialog/failure-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  amount: number = 0;
  insufficientFundsMessage: string = ''; // Added variable to store the message

  constructor(private dialog: MatDialog, private withdrawService: WithdrawService, private router: Router) {}

  withdraw() {
    // Get the withdrawal amount from the 'amount' property or user input
    const withdrawalAmount = this.amount;

    // Call the withdraw service to perform the withdrawal
    this.withdrawService.withdraw(withdrawalAmount).subscribe(
      (response) => {
        // Handle a successful withdrawal
        if (response.newBalance !== undefined) {
          this.dialog.open(SuccessDialogComponent, {
            data: { title: 'Withdrawal Successful', message: `New Balance: $${response.newBalance}` }
          });
          this.insufficientFundsMessage = ''; // Clear any previous insufficient funds message
        } else {
          alert('Insufficient Funds');
        }
      },
      (error) => {
        // Handle withdrawal failure, e.g., show an error message
        console.error('Withdrawal failed:', error);

        // Check if the error message indicates insufficient funds
        if (error.error && error.error.message === 'Insufficient Funds') {
          this.insufficientFundsMessage = 'Not enough funds'; // Set the insufficient funds message
        } else {
          this.dialog.open(FailureDialogComponent, {
            data: { title: 'Withdrawal Failed', message: 'An error occurred during the withdrawal.' }
          });
        }
      }
    );
  }

  goBack() {
    // Use the Router to navigate to the welcome page
    this.router.navigate(['/welcome']); // Adjust the route as per your application structure
  }
  
}
