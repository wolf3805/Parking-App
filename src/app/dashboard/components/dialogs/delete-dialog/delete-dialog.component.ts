import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialog: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialog.close(false);
  }
  
  delete(): void {
    this.dialog.close(true);
  }

}
