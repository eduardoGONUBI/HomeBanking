import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-failure-dialog',
  templateUrl: './failure-dialog.component.html',
})
export class FailureDialogComponent {
  constructor(public dialogRef: MatDialogRef<FailureDialogComponent>) {}
}
