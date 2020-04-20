import { Component, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {
  form: FormGroup;
  username: string;
  errorMessage:string;

  apiBaseUrl = `${environment.baseUrl}/api`;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private fb: FormBuilder,
    private router: Router
  )  { }

  //cancel function
  cancel() {
    this.dialogRef.close(null);
  }

  //redirects to the reset password page. 
  resetPassword(){
    this.username = this.form.controls.username.value;
    this.dialogRef.close(null);
    this.router.navigate([`/session/users/${this.username}/verify-security-questions`]);
  }

  
  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required],[this.isValid.bind(this)]]
    });
  }


  //validator that determines if username input is valid or not. 
  isValid(control: FormControl){
    //takes the result of the verifyUsers api and maps it to a variable username
   return this.http.get(this.apiBaseUrl + '/session/verify/users/' + control.value).pipe(map((username: any) => {
      //returns true for usernameExists if the username was found, otherwise returns null
      return username ? null : { usernameExists: true };
    }
    ));
  }
}
