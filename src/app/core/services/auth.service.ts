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
  userName
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
    // return this.cookieService.get('userMeta');
    return localStorage.getItem('userMeta');
  }

  logout(check?: string) {
    this.http.get(APIs.logout).subscribe((res) => {
      localStorage.clear();
      // this.cookieService.deleteAll();
      // this.cookieService.deleteAll();
      this.router.navigate(['/signin']);
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

  getRole() {
    // const role = JSON.parse(this.cookieService.get('userMeta')).userInfo.role
    const role = JSON.parse(localStorage.getItem('userMeta')).userInfo.role
    return role;
  }

  getOfficers() {
    return this.http.get(APIs.getOfficers)
  }
}
