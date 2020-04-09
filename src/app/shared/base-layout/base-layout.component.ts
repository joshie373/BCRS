import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  hasAdmin = false;
  userName: string;
  userId: string;

  constructor(private cookieService: CookieService, private sessionService: SessionService, private router: Router, private dialog: MatDialog) {
    this.sessionService
    .getUserRole()
    .subscribe((res) => {
      this.hasAdmin = res.toLowerCase().trim() === 'admin';
    }, (err) => {
      console.log('base-layout.component/getrole:', err);
    });

    this.sessionService
    .getUserId()
    .subscribe((res) => {
      this.userId = res;
    }, (err) => {
      console.log('base-layout.component/getuserId', err);
    });
  }
 
  //funciton to view a profile
  viewProfile(userId){
    let currentPage = this.router.url;
    console.log(currentPage);
    // this.router.navigate(['profile/'+userId],{state:{ previousPage:currentPage}});
    this.router.navigate(['profile/'+userId], { state: { previousPage: currentPage } });
  }

  ngOnInit() {
    this.userName = this.sessionService.getUser();
  }

  
   //Delete cookie and redirect to signin page.
  logout() {
    this.sessionService.logOut();
    this.router.navigate(['/session/signin']);
  }

}
