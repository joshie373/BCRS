import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isAuthenticated: string;
  username: string;
  form: FormGroup;

  constructor(private router: Router,private route: ActivatedRoute,private http: HttpClient, private fb: FormBuilder, public cookieService: CookieService) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username =  this.route.snapshot.queryParamMap.get('username');
    console.log(this.username);
   }

  ngOnInit() {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required])],
    });
  }

  //reset password
  resetPassword(){
    
    this.http.post('/api/session/users/'+ this.username + '/reset-password',{
      password: this.form.controls['password'].value
    }).subscribe(res =>{
      this.cookieService.set('sessionuser',this.username,1) ;
      this.router.navigate(['/']);
    },err =>{
      console.log(err);
    });

  }

}
