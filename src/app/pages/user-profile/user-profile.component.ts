import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string;
  user: any;
  userId: string;
  form: FormGroup;
  roles: any;
  
  previousPage = this.router.getCurrentNavigation().extras.state.previousPage;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.userId = this.route.snapshot.paramMap.get('userId');
      console.log(this.userId);
      console.log();

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
  
  ngOnInit() {
    
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation().extras.state)
    );
  

    this.form = this.fb.group({
      firstname: [null,Validators.compose([Validators.required])],
      lastname: [null,Validators.compose([Validators.required])],
      phoneNumber: [null,Validators.compose([Validators.required])],
      address: [null,Validators.compose([Validators.required])],
      email: [null,Validators.compose([Validators.required])],
      role: [null,Validators.compose([Validators.required])]
    });
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
      this.router.navigate([`${this.previousPage}`]);
    });
  }

  //cancel function
  cancel(){
    this.router.navigate([`${this.previousPage}`]);
  }
}
