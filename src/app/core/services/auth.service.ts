import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { APIs } from '../constants/apis';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo;
  constructor(
    private alertMessages: AlertService,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  signin(signinForm: FormGroup) {
    return this.http.post(APIs.signin, signinForm.value);
  }

  authStatus() {
    if (this.cookieService.check('userMeta')) {
      const userMeta = JSON.parse(this.cookieService.get('userMeta')).user;
      if (userMeta) {
        this.http.post(APIs.loginCheck, { uid: userMeta.uid })
          .subscribe((success: any) => {
          }, (error) => {
            this.logout('expire');
          });
      } else {
        this.logout('expire');
      }
    }
  }

  isLoggedIn() {
    return this.cookieService.get('userMeta');
  }

  logout(check?: string) {
    this.http.get(APIs.logout).subscribe(() => {
      localStorage.clear();
      this.cookieService.deleteAll();
      console.log('logout');
      this.router.navigate(['signin']);
      if (check === 'expire') {
        this.alertMessages.warningAlert(this.alertMessages.logout.Title, this.alertMessages.logout.expireMsg);
      } else {
        this.alertMessages.successAlert(this.alertMessages.logout.Title, this.alertMessages.logout.Msg);
      }
    });
  }

  createOfficer(form: Object) {
    return this.http.post(APIs.registerOfficer, form);
  }
}
