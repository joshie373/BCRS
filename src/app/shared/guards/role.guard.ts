
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { map } from 'rxjs/operators';


@Injectable()

export class RoleGuard implements CanActivate {


  constructor(private router: Router, private sessionService: SessionService) { }


  //If the user is logged in return true otherwise route to login page
  canActivate() {
    return this.sessionService
      .getUserRole()
      .pipe(map((role) => {
        if (role
          && role.toLowerCase().trim() === 'admin') {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }

      }));
  }
}
