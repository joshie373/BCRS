import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private cookieService: CookieService) { }
  
  username: string;

  ngOnInit() {
    this.username = this.cookieService.get('sessionuser');
  }

}
