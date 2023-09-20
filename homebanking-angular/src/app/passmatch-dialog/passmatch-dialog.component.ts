import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-passmatch-dialog',
  templateUrl: './passmatch-dialog.component.html',
})
export class PassmatchDialogComponent {
  constructor(public dialogRef: MatDialogRef<PassmatchDialogComponent>) {}
}
