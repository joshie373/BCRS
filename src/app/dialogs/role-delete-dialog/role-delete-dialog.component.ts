import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-role-delete-dialog',
  templateUrl: './role-delete-dialog.component.html',
  styleUrls: ['./role-delete-dialog.component.css']
})
export class RoleDeleteDialogComponent implements OnInit {

  roleId: string;

  constructor(
    private dialogRef: MatDialogRef<RoleDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)data) {
      this.roleId = data.roleId;
    }

  ngOnInit() {
  }

}
