
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { UserDeleteDialogComponent } from 'src/app/dialogs/user-delete-dialog/user-delete-dialog.component';
import { UserRegistrationDialogComponent } from 'src/app/dialogs/user-registration-dialog/user-registration-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  displayedColumns = ['username','firstname', 'lastname', 'phoneNumber', 'address', 'email', 'role', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, ) {
    this.getUsers();
   }

   //getUsers
   getUsers(){
    this.http.get('/api/users').subscribe(res =>{
      this.users = res;
      console.log(this.users);
    },err =>{
      console.log(err);
    })
   }

  ngOnInit() {
  }

  //delete function
  delete(userId, username){
    const dialogRef = this.dialog.open(UserDeleteDialogComponent,{
      data: {
        username
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result === 'confirm') {
        this.http.delete('/api/users/'+ userId).subscribe(res =>{
          console.log('User Deleted');
          this.users = this.users.filter(u =>u._id !== userId);
        });
      }
    });
  }


  //resiter function
  newUser() {
    // declare and create the material dialog
    const dialogRef = this.dialog.open(UserRegistrationDialogComponent, {
      width: '70%',
      height: '80%', 
      disableClose: true, 
      data: { id: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }

      // else they canceled nothing to do here
    });
  }


}
