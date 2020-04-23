import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {

  form:FormGroup;
  services: any;
  serviceIds:any=[];
  lastId: number;

  constructor(private http: HttpClient, private fb: FormBuilder ,private router: Router) { }

  ngOnInit() {
    this.getServices();
    this.form = this.fb.group({
      id: [{value: this.lastId+1, disabled:true},Validators.compose([Validators.required])],
      title: [null,Validators.compose([Validators.required])],
      price: [null,Validators.compose([Validators.required])],
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

  //getServices
  getServices(){
    //http call to get the services and set form fields
    this.http.get('/api/services').subscribe(res => {
      this.services = res;
      console.log("services",this.services);
      this.services.forEach(element => {
        this.serviceIds.push(parseInt(element.id));
      });
      this.lastId = Math.max.apply(null,this.serviceIds);
     
      this.form.controls.id.setValue(this.lastId+1);
    },err =>{
      console.log(err);
    });
  }

  //create
  create(){
    this.http.post('/api/services',{
      id: this.form.controls.id.value,
      title:this.form.controls.title.value,
      price:this.form.controls.price.value,
    }).subscribe(res =>{
      this.router.navigate(['/services']);
    });

  }

  //cancel
  cancel(){
    this.form.reset();
    this.router.navigate(['/services']);
  }


}
