import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ServiceDeleteDialogComponent } from 'src/app/dialogs/service-delete-dialog/service-delete-dialog.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  apiBaseUrl = `${environment.baseUrl}/api/services`;
  services: any ;
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'functions'
  ];


  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.http.get('/api/services').subscribe(res =>{
      this.services = res;
      console.log(this.services);
    },err =>{
      console.log(err);
    })
   }

  coreService(id:string){
    if(Number(id)>100 && Number(id)<108){
      return true;
    }
    return false;
  }
 
  ngOnInit() {
  }

  // delete function - deletes question ID
  delete(serviceId){
    const dialogRef = this.dialog.open(ServiceDeleteDialogComponent,{
      data: {
        serviceId
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result === 'confirm') {
        this.http.delete('/api/services/'+serviceId).subscribe(res =>{
          console.log('Service Deleted');
          this.services = this.services.filter(service =>service._id !== serviceId);
          console.log(this.services);
        });
      }
    });
  }


}
