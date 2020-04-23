import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {


  service: any;
  serviceId: string;
  form: FormGroup;
  curId: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder,private router: Router) {
    this.serviceId = this.route.snapshot.paramMap.get('serviceId');

    this.http.get('/api/services/'+ this.serviceId).subscribe(res =>{
      this.service = res;
    }, err =>{
      console.log(err);
    },() => {
      this.form.controls.id.setValue(this.service.id);
      this.curId = this.service.id;
      this.form.controls.title.setValue(this.service.title);
      this.form.controls.price.setValue(this.service.price);
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [{value:this.curId,disabled:true},Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])]
    });
  }

  //function to check input and evaluate if character is a number or a decimal place. 
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //saves service
  saveService(){
    this.http.put('/api/services/'+ this.serviceId,{
      id: this.form.controls.id.value,
      title:this.form.controls.title.value,
      price:this.form.controls.price.value
    }).subscribe(res =>{
      this.router.navigate(['/services']);
    });
  }

  //cancels and routes back to security questions page
  cancel(){
    this.router.navigate(['/services']);
  }
}
