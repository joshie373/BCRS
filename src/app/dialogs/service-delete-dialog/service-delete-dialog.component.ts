import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-service-delete-dialog',
  templateUrl: './service-delete-dialog.component.html',
  styleUrls: ['./service-delete-dialog.component.css']
})
export class ServiceDeleteDialogComponent implements OnInit {

  serviceId: string;

  constructor(
    private dialogRef: MatDialogRef<ServiceDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)data) {
      this.serviceId = data.serviceId;
    }

    ngOnInit() {
    }
  

}
