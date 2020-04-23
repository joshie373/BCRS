import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {


  form:FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder ,private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null,Validators.compose([Validators.required])],
    });
  }

  //create
  create(){
    this.http.post('/api/roles',{
      text:this.form.controls.text.value,
    }).subscribe(res =>{
      this.router.navigate(['/roles']);
    });

  }

  //cancel
  cancel(){
    this.router.navigate(['/roles']);
  }

}
