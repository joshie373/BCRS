import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { SecurityQuestion } from 'src/app/models/security-question.model';
import { environment } from 'src/environments/environment';

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

  selectedSecurityQuestions: any;
  questions: SecurityQuestion[];
  
  previousPage: string;

  apiBaseUrl = `${environment.baseUrl}/api`;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
    ) 
    { 
        this.userId = this.route.snapshot.paramMap.get('userId');
        console.log(this.userId);
        console.log();

        this.http.get('/api/users/' + this.userId).subscribe(res => {
          this.user = res;
        },err =>{
          console.log(err);
        }, () =>{
          this.username = this.user.username;
          this.form.controls.firstname.setValue(this.user.firstname);
          this.form.controls.lastname.setValue(this.user.lastname);
          this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
          this.form.controls.address.setValue(this.user.address);
          this.form.controls.email.setValue(this.user.email);
          this.form.controls.role.setValue(this.user.role);

          this.form.controls.answer1.setValue(this.user.securityQuestions[0].answer);
          this.form.controls.answer2.setValue(this.user.securityQuestions[1].answer);
          this.form.controls.answer3.setValue(this.user.securityQuestions[2].answer);
          
          this.getUserSecurityQuestions();
        });

        
        try {
          this.previousPage = this.router.getCurrentNavigation().extras.state.previousPage ;
        } catch (error) {
          if(error){
            this.previousPage = '/'
          }
        }

        // get the security questions to display in the dropdowns
        this.http.get<SecurityQuestion[]>(`${this.apiBaseUrl}/security-questions`)
        .subscribe((questions) => {
          this.questions = questions;
        }, (err) => {
          console.log('user-profile.component/constructor', err);
        });
    }
  
  //initialize function
  ngOnInit() {
    
    //uses the router to extract and map the extras passed in from the user profile page. 
    this.router.events.pipe(filter(e => e instanceof NavigationStart),map(() => this.router.getCurrentNavigation().extras.state));
  
    //sets form field validators
    this.form = this.fb.group({
      firstname: [null,Validators.compose([Validators.required])],
      lastname: [null,Validators.compose([Validators.required])],
      phoneNumber: [null,Validators.compose([Validators.required])],
      address: [null,Validators.compose([Validators.required])],
      email: [null,Validators.compose([Validators.required])],
      role: [null,Validators.compose([Validators.required])],
      answer1: [null,Validators.compose([Validators.required])],
      answer2: [null,Validators.compose([Validators.required])],
      answer3: [null,Validators.compose([Validators.required])],
      question1: [null,Validators.compose([Validators.required])],
      question2: [null,Validators.compose([Validators.required])],
      question3: [null,Validators.compose([Validators.required])]
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
      role: this.form.controls.role.value,
      securityQuestions: [
        {
          questionId: this.form.controls.question1.value,
          answer:  this.form.controls.answer1.value
        },
        {
          questionId: this.form.controls.question2.value,
          answer:  this.form.controls.answer2.value
        },
        {
          questionId: this.form.controls.question3.value,
          answer:  this.form.controls.answer3.value
        },
      ]
    }).subscribe(res => {
      if(!this.previousPage){
        this.router.navigate(['/']);
      }
      else{
        this.router.navigate([`${this.previousPage}`]);
      }
    });
  }

  //cancel function
  cancel(){
    //handles redirect to last page after cancel of the 
    if(!this.previousPage){
      this.router.navigate(['/']);
    }
    else{
      this.router.navigate([`${this.previousPage}`]);
    }
    
  }

  //verifies username
  resetPassword(){
    this.router.navigate([`/session/users/${this.username}/verify-security-questions`]);
  }

  //getUserSecurityQuestions
  getUserSecurityQuestions(){
    this.http.get('/api/users/'+ this.username + '/security-questions').subscribe(res =>{ //
      this.selectedSecurityQuestions = res;
      console.log(this.selectedSecurityQuestions);
    },err =>{
      console.log(err);
    },() =>{
      this.http.post('/api/security-questions/find-by-ids',{ // finds security questions by ids
        question1: this.selectedSecurityQuestions[0].questionId,
        question2: this.selectedSecurityQuestions[1].questionId,
        question3: this.selectedSecurityQuestions[2].questionId
      }).subscribe(res =>{

        
        this.form.controls.question1.setValue(res[0].id);
        this.form.controls.question2.setValue(res[1].id);
        this.form.controls.question3.setValue(res[2].id);
      });
    });
  }

  getAllSecurityQuestions(){

  }
}
