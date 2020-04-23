import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purchases-by-service',
  templateUrl: './purchases-by-service.component.html',
  styleUrls: ['./purchases-by-service.component.css']
})
export class PurchasesByServiceComponent implements OnInit {

  purchases: any;
  data:any;
  itemCount =[];
  labels=[];

  constructor(private http:HttpClient) {
    this.http.get('api/invoices/purchases-graph').subscribe(res => {
      this.purchases = res;

      for(const item of this.purchases){
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      this.data = {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            hoverBackgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            data: this.itemCount
          },
        ]
      };

      console.log('Data object');
      console.log(this.data);
    }, err =>{
      console.log(err);
    });

   }

  ngOnInit() {
  }

}
