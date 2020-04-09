// ============================================
// ; Title:          security-question-delete-dialog.component.ts
// ; Author:         Tyler Librandi
// ; Date:           09 April 2020
// ; Description:    Dialog for deleting security question
// ;===========================================

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-security-question-delete-dialog',
  templateUrl: './security-question-delete-dialog.component.html',
  styleUrls: ['./security-question-delete-dialog.component.css']
})
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
