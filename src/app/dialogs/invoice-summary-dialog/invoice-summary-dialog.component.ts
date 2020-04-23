// ============================================
// ; Title:          invoice-summary-dialog.component.ts
// ; Author:         Tyler Librandi
// ; Date:           21 April 2020
// ; Description:    Dialog for invoice summary angular content
// ;===========================================

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.css']
})
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: any;

  constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.invoice = data.invoice;
  }

  ngOnInit() {
  }

}
