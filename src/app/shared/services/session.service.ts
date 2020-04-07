/*
============================================
; Title: session.service
; Author: Joshua Hughes
; Date: 04/07/2020
; Modified By: Joshua Hughes
; Description: Session cookie service
;===========================================
*/

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class SessionService {
  cookie = 'sessionuser';
  baseURL = `${environment.baseUrl}/api/users`;

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  //function to get the usernfrom cookies
  getUser(): string {
    const user = this.cookieService.get(this.cookie);

    if (user) {
      //returns the user cookie if it exists
      return user;
    } else {
      return null;
    }
  }

  //gets role from user cookie
  getUserRole(): Observable<string> {
    return this.http.get<string>(`${this.baseURL}/${this.cookieService.get(this.cookie)}/role`);
  }

  //checks if login cookie exists already
  hasLoginCookie(): boolean {
    const userCookie = this.cookieService.get(this.cookie);
    //returns true if the cookie exists
    if (userCookie) {
      return true;
    } else {
      return false;
    }
  }

  //logout function
  logOut() {
    //deletes login cookie
    this.cookieService.delete(this.cookie);
  }

  //getter to get username from cookies
  getUsername(): string {
    return this.cookieService.get(this.cookie);
  }
}