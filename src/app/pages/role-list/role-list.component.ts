import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { RoleDeleteDialogComponent } from 'src/app/dialogs/role-delete-dialog/role-delete-dialog.component';


@Component({
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  apiBaseUrl = `${environment.baseUrl}/api/roles`;
  roles: any ;
  displayedColumns: string[] = [
    'role',
    'functions'
  ];


  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.http.get('/api/roles').subscribe(res =>{
      this.roles = res;
      console.log(this.roles);
    },err =>{
      console.log(err);
    })
   }

 
  ngOnInit() {
  }

  // delete function - deletes question ID
  delete(roleId){
    const dialogRef = this.dialog.open(RoleDeleteDialogComponent,{
      data: {
        roleId
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result === 'confirm') {
        this.http.delete('/api/roles/'+roleId).subscribe(res =>{
          console.log('Role Deleted');
          this.roles = this.roles.filter(role =>role._id !== roleId);
          console.log(this.roles);
        });
      }
    });
  }

 
}