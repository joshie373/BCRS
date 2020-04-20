import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-security-questions',
  templateUrl: './verify-security-questions.component.html',
  styleUrls: ['./verify-security-questions.component.css']
})
export class VerifySecurityQuestionsComponent implements OnInit {

  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;
  username: string;
  form: FormGroup;

  constructor(private router: Router,private route: ActivatedRoute,private http: HttpClient, private fb: FormBuilder){ 

    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);

    this.http.get('/api/users/'+ this.username + '/security-questions').subscribe(res =>{
      this.selectedSecurityQuestions = res;
      console.log(this.selectedSecurityQuestions);
    },err =>{
      console.log(err);
    },() =>{
      this.http.post('/api/security-questions/find-by-ids',{
        question1: this.selectedSecurityQuestions[0].questionId,
        question2: this.selectedSecurityQuestions[1].questionId,
        question3: this.selectedSecurityQuestions[2].questionId
      }).subscribe(res =>{
        this.question1 = res[0].text;
        this.question2 = res[1].text;
        this.question3 = res[2].text;

        console.log(this.question1);
        console.log(this.question2);
        console.log(this.question3);
      });
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      answerSQ1: [null, [Validators.required]],
      answerSQ2: [null, [Validators.required]],
      answerSQ3: [null, [Validators.required]],
    });
  }

  //verify security questions
  verifySecurityQuestions(){
    const answerSQ1 = this.form.controls['answerSQ1'].value;
    const answerSQ2 = this.form.controls['answerSQ2'].value;
    const answerSQ3 = this.form.controls['answerSQ3'].value;

    this.http.post('/api/session/verify/users/' + this.username + '/security-questions',{
      answerSQ1: answerSQ1,
      answerSQ2:answerSQ2,
      answerSQ3:answerSQ3
    }).subscribe(res =>{
      console.log(res);
      if(res['auth']){
        this.router.navigate(['/session/reset-password'],{queryParams: {isAuthenticated: true, username: this.username},skipLocationChange: true});
      }else{
        console.log("unable to verify security question answers")
      }
    });
  }

}
