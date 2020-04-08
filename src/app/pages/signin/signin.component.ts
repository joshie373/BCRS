import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  apiBaseUrl = `${environment.baseUrl}/api`;
  form: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')])]
    });
  }

  //sign in function
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
        this.router.navigate(['/']);
      } else { // else display error message
        this.errorMessage = res['text'];
      }
    }, (err) => {
      console.log('signin.component/signin', err);
      this.errorMessage = err.error['text'];
    });
  }

}
