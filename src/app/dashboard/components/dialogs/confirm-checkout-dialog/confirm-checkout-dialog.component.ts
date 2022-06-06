import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-checkout-dialog',
  templateUrl: './confirm-checkout-dialog.component.html',
  styleUrls: ['./confirm-checkout-dialog.component.scss']
})
export class ConfirmCheckoutDialogComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ConfirmCheckoutDialogComponent>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialog.close(false);
  }
  
  confirm(): void {
    this.dialog.close(true);
  }

}
