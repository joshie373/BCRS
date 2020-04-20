/** 
============================================
; Title: signin.component.ts
; Author: Karie Funk
; Modified by: Karie Funk
; Date: 09 April 2020
; Description: This is the sign in component
; for BCRS
;===========================================
*/

// Start Program

//Import Modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';
import { UserRegistrationDialogComponent } from 'src/app/dialogs/user-registration-dialog/user-registration-dialog.component';
import { ForgotPasswordDialogComponent } from 'src/app/dialogs/forgot-password-dialog/forgot-password-dialog.component';

//Component Details
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

//Exporting Component
export class SigninComponent implements OnInit {
  
  apiBaseUrl = `${environment.baseUrl}/api`;
  form: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])]
    });
  }

  //Sign in Function
  signin() {
    const username = this.form.controls.username.value;
    const password = this.form.controls.password.value;
    this.http.post(`${this.apiBaseUrl}/session/signin`, {
      username,
      password
    }).subscribe(res => {
      if (res['type'] == 'success') {
        console.log(res);
        this.cookieService.set('sessionuser', username, 1);
        this.form.reset();
        this.router.navigate(['/']);
      } else { // else display error message
        this.errorMessage = res['text'];
        
      }
    }, (err) => {
      console.log('signin.component/signin', err);
      this.errorMessage = err.error['text'];
      this.form.controls.password.reset();
    });
  }

  //resiter function
  register() {
    // declare and create the material dialog
    const dialogRef = this.dialog.open(UserRegistrationDialogComponent, {
      width: '70%',
      height: '80%', // options to control height and width of dialog
      disableClose: true, // the user cannot click in the overlay to close
      // pass the title and message to the dialog
      data: { id: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // the user was updated need to replace them in the array
        this.cookieService.set('sessionuser', result, 1);
        this.router.navigate(['/']);
      }

      // else they canceled nothing to do here
    });
  }

  //reset password
  reset(){
    // declare and create the material dialog
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '40%',
      height: '60%', // options to control height and width of dialog
      disableClose: true, // the user cannot click in the overlay to close
      // pass the title and message to the dialog
      data: { id: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // the user was updated need to replace them in the array

        //this.router.navigate(['/']);
      }

      // else they canceled nothing to do here
    });
  }

  private displayMessage(message: string) {
    // display the snackbar message for 10sec
    this.snackBar.open(message, 'OK', {
      duration: 10000
    });
  }
  
  
  // End Program


}


