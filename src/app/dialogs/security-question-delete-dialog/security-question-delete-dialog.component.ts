// ============================================
// ; Title:          security-question-delete-dialog.component.ts
// ; Author:         Tyler Librandi
// ; Date:           12 April 2020
// ; Description:    Dialog for deleting security question
// ;===========================================

// Imports
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-security-question-delete-dialog',
  templateUrl: './security-question-delete-dialog.component.html',
  styleUrls: ['./security-question-delete-dialog.component.css']
})

// Class export
export class SecurityQuestionDeleteDialogComponent implements OnInit {
  questionId: string;

  constructor(
    private dialogRef: MatDialogRef<SecurityQuestionDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)data) {
      this.questionId = data.questionId;
    }

  ngOnInit() {
  }

}
