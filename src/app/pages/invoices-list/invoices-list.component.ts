import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit {

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


  constructor(private http: HttpClient) {
    this.http.get('/api/invoices').subscribe(res =>{
      this.invoices = res;
      console.log(this.invoices);
    },err =>{
      console.log(err);
    })
   }
 
  ngOnInit() {
  }

}
