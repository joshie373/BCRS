import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-invoices',
  templateUrl: './user-invoices.component.html',
  styleUrls: ['./user-invoices.component.css']
})
export class UserInvoicesComponent implements OnInit {


  apiBaseUrl = `${environment.baseUrl}/api/invoices`;
  invoices: any ;
  displayedColumns: string[] = [
    'id',
    'username',
    'orderDate',
    'total',
    'partsAmount',
    'laborAmount',
    'lineItemTotal',
    'lineItems'
  ];
  username: string;


  constructor(private http: HttpClient, public cookieService: CookieService) {
    this.username = cookieService.get('sessionuser');
    this.http.get('/api/invoices/'+this.username).subscribe(res =>{
      this.invoices = res;
      console.log(this.invoices);
    },err =>{
      console.log(err);
    })
   }
 
  ngOnInit() {
  }
}
