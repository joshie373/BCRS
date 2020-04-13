// ============================================
// ; Title:          security-question-detail.component.ts
// ; Author:         Tyler Librandi
// ; Date:           12 April 2020
// ; Description:    Security question detail
// ;===========================================

// Imports
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-security-question-detail',
  templateUrl: './security-question-detail.component.html',
  styleUrls: ['./security-question-detail.component.css']
})

// Class export
export class SecurityQuestionDetailComponent implements OnInit {
  question: any;
  questionId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder,private router: Router) {
    this.questionId = this.route.snapshot.paramMap.get('questionId');

    this.http.get('/api/security-questions/'+ this.questionId).subscribe(res =>{
      this.question = res;
    }, err =>{
      console.log(err);
    },() => {
      this.form.controls.text.setValue(this.question.text);
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  //saves question
  saveQuestion(){
    this.http.put('/api/security-questions/'+ this.questionId,{
      text: this.form.controls.text.value,
    }).subscribe(res =>{
      this.router.navigate(['/security-questions']);
    });
  }

  //cancels and routes back to security questions page
  cancel(){
    this.router.navigate(['/security-questions']);
  }

}
