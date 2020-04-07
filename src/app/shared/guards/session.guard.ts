/*
============================================
; Title: session.guard
; Author: Joshua Hughes
; Date: 04/07/2020
; Modified By: Joshua Hughes
; Description: Guard for session
;===========================================
*/


import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()

export class SessionGuard implements CanActivate, CanActivateChild {

 
  constructor(private router: Router, private sessionService: SessionService) {}


  canActivate(): boolean {
    return this.loginCheck();
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.loginCheck();
  }

  //checks if logged in
  private loginCheck() {
    //returns true if the function from the session service returns valid check for cookie
    // else redirects back to sigin page
    if (!this.sessionService.hasLoginCookie()) {
      this.router.navigate(['session/signin']);
    }
    return true;
  }
}
