import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  //variables
  username: string;
  user: any;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(
    public cookieService: CookieService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.userId = this.route.snapshot.paramMap.get('userId');
      console.log(this.userId);

      //http call to get the users and set form fields
      this.http.get('/api/users/' + this.userId).subscribe(res => {
        this.user = res;
      },err =>{
        console.log(err);
      }, () =>{
        this.form.controls.firstname.setValue(this.user.firstname);
        this.form.controls.lastname.setValue(this.user.lastname);
        this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
        this.form.controls.address.setValue(this.user.address);
        this.form.controls.email.setValue(this.user.email);
        this.form.controls.role.setValue(this.user.role);
        this.username = this.user.username;
      });
    }
  
  //init function
  ngOnInit() {
    this.form = this.fb.group({
      firstname: [null,Validators.compose([Validators.required])],
      lastname: [null,Validators.compose([Validators.required])],
      phoneNumber: [null,Validators.compose([Validators.required])],
      address: [null,Validators.compose([Validators.required])],
      email: [null,Validators.compose([Validators.required])],
      role: [null,Validators.compose([Validators.required])]
    });
    this.getRoles();
  }

  //saveUser function
  saveUser(){
    this.http.put('/api/users/'+this.userId,{
      firstname: this.form.controls.firstname.value,
      lastname: this.form.controls.lastname.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      address: this.form.controls.address.value,
      email: this.form.controls.email.value,
      role: this.form.controls.role.value
    }).subscribe(res => {
      this.router.navigate(['/users']);
    });
  }

  //cancel function
  cancel(){
    this.router.navigate(['/users']);
  }

  getRoles(){
    //http call to get the users and set form fields
    this.http.get('/api/roles').subscribe(res => {
      this.roles = res;
      console.log("roles",this.roles);
    },err =>{
      console.log(err);
    });
  }
}
