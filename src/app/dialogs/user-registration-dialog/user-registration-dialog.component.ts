import { Component, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SecurityQuestion } from 'src/app/models/security-question.model';


@Component({
  templateUrl: './user-registration-dialog.component.html',
  styleUrls: ['./user-registration-dialog.component.css']
})

export class UserRegistrationDialogComponent implements OnInit {
  
  apiBaseUrl = `${environment.baseUrl}/api`;

  //variables
  user: User = new User();
  isLinear = true;
  accountForm: FormGroup;
  addressForm: FormGroup;
  sqForm: FormGroup;
  username: string;
  questions: SecurityQuestion[];
  show:boolean;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserRegistrationDialogComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // get the security questions to display in the dropdowns
    this.http.get<SecurityQuestion[]>(`${this.apiBaseUrl}/security-questions`)
      .subscribe((questions) => {
        this.questions = questions;
      }, (err) => {
        console.log('user-registration-dialog.component/constructor', err);
      });
  }

  //init function
  ngOnInit() {
    this.accountForm = this.fb.group({
      username: [
        null, 
        [Validators.required],[this.isValid.bind(this)]
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[0-9]/)
        ])
      ],
      firstname: [null],
      lastname: [null],
      email: [null, [Validators.email]],
      phoneNumber: [null]
    });

    // subscribe to form changes and fill the user variable for the component
    this.accountForm.valueChanges.subscribe(() => {
      this.user.username = this.accountForm.controls.username.value;
      this.user.password = this.accountForm.controls.password.value;
      this.user.firstname = this.accountForm.controls.firstname.value;
      this.user.lastname = this.accountForm.controls.lastname.value;
      this.user.phoneNumber = this.accountForm.controls.phoneNumber.value;
      this.user.email = this.accountForm.controls.email.value;
    });

    // the address form validators
    this.addressForm = this.fb.group({
      addressLine1: [null],
      city: [null],
      state: [null],
      postalCode: [null]
    });

    // updates all changes to the address form to the user as they are made
    this.addressForm.valueChanges.subscribe(() => {
      this.user.address = this.addressForm.controls.addressLine1.value + " " + this.addressForm.controls.city.value + ", " + this.addressForm.controls.state.value + " " + this.addressForm.controls.postalCode.value;
    });

    // security question form validators
    this.sqForm = this.fb.group({
      questionId1: [null, [Validators.required]],
      answer1: [null, [Validators.required]],
      questionId2: [null, [Validators.required]],
      answer2: [null, [Validators.required]],
      questionId3: [null, [Validators.required]],
      answer3: [null, [Validators.required]],

    });
  }

  //validator that determines if username input is valid or not. 
  isValid(control: FormControl){
    return this.http.get(this.apiBaseUrl + '/session/verify/users/' + control.value).pipe(map((username: any) => {
       return username ? { usernameExists: true } : null ;
     }
     ));
   }

  //question getter function
  getSecurityQuestions() {
    this.user.securityQuestions = [];

    //push sec ques 1
    this.user.securityQuestions.push({
      questionId: this.sqForm.controls.questionId1.value,
      answer: this.sqForm.controls.answer1.value
    });

    //push sec ques 2
    this.user.securityQuestions.push({
      questionId: this.sqForm.controls.questionId2.value,
      answer: this.sqForm.controls.answer2.value
    });

    //push sec ques 3
    this.user.securityQuestions.push({
      questionId: this.sqForm.controls.questionId3.value,
      answer: this.sqForm.controls.answer3.value
    });
  }

  //cancel function
  cancel() {
    this.dialogRef.close(null);
  }

  //function to sign in after complete registration
  signIn() {
      
      if (this.accountForm.valid
        && this.sqForm.valid) {
        this.http
          .post(`${this.apiBaseUrl}/session/register`, this.user)
          .subscribe(
            (res:any) => {
              // if result is returned, then signin
              if (res['type'] == 'success') {
                console.log('user-registration-dialog.component/signIn', 'success', res);
                this.username = res['username'];
              }
            },
            (err) => {
              console.log('user-registration-dialog.component/signIn', 'error', err);
            },
            () => {
              if (this.username) {
                this.dialogRef.close(this.username);
              }

            }
          );
      }
    }

  //shows Error Message
  private displayMessage(message: string) {
    // display the snackbar message for 10sec
    this.snackBar.open(message, 'OK', {
      duration: 10000
    });
  }

}