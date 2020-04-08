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

  constructor(private cookieService: CookieService, private sessionService: SessionService, private router: Router, private dialog: MatDialog) {

  }
  userName: string;


  ngOnInit() {
    this.userName = this.sessionService.getUser();
  }

  
   //Delete cookie and redirect to signin page.
  logout() {
    this.sessionService.logOut();
    this.router.navigate(['/session/signin']);
  }

}
