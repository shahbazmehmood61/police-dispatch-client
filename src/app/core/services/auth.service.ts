import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { APIs } from '../constants/apis';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, take } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName
  userInfo;
  token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxOTI5ZmY0NWM2MDllYzRjNDhlYmVmMGZiMTM5MmMzOTEzMmQ5YTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9saWNlLWRpc3BhdGNoLTJlZGU1IiwiYXVkIjoicG9saWNlLWRpc3BhdGNoLTJlZGU1IiwiYXV0aF90aW1lIjoxNjA0NTk2Njc1LCJ1c2VyX2lkIjoicnFnRUNyTXd0SmJjTGg4RlM2Yk11WjV6bUhmMSIsInN1YiI6InJxZ0VDck13dEpiY0xoOEZTNmJNdVo1em1IZjEiLCJpYXQiOjE2MDQ1OTY2NzUsImV4cCI6MTYwNDYwMDI3NSwiZW1haWwiOiJ0ZXN0Lm9mZmljZXIxQHBkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0Lm9mZmljZXIxQHBkLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.i_M59X0bicyzN5xzTXn6Pn7pyjZI_w3zHFA7tkhOSzpU-7OnIL8wHNNgHWnYZz835YGPcc_P9GkYYEuMIRurupDmvTXJaWcfjFaaC9hiSRSSNby2pkSTHG4lxiP-EfPQCyvYqyV_Fd-ovhOcIeUPh0InHQgly1jnxcAhiSg34iT8zowf91fOQOizPQvTFhMAtiYdYcayH6hGnKvg8t_rs20LI-I3pfUQ5zhxIYhHfAB5zJ7iAwyn6V31uXgAJetf0M9WF9q0hnzpFGdT2MABD2df50OX2-m2y07ByfONtkml4cn9CgWS5k4CkOM_Fj43urn00u39EqQl6UeylMpMiA"
  // "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxOTI5ZmY0NWM2MDllYzRjNDhlYmVmMGZiMTM5MmMzOTEzMmQ5YTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9saWNlLWRpc3BhdGNoLTJlZGU1IiwiYXVkIjoicG9saWNlLWRpc3BhdGNoLTJlZGU1IiwiYXV0aF90aW1lIjoxNjA0NTk2Njc1LCJ1c2VyX2lkIjoicnFnRUNyTXd0SmJjTGg4RlM2Yk11WjV6bUhmMSIsInN1YiI6InJxZ0VDck13dEpiY0xoOEZTNmJNdVo1em1IZjEiLCJpYXQiOjE2MDQ1OTY2NzUsImV4cCI6MTYwNDYwMDI3NSwiZW1haWwiOiJ0ZXN0Lm9mZmljZXIxQHBkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0Lm9mZmljZXIxQHBkLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.i_M59X0bicyzN5xzTXn6Pn7pyjZI_w3zHFA7tkhOSzpU-7OnIL8wHNNgHWnYZz835YGPcc_P9GkYYEuMIRurupDmvTXJaWcfjFaaC9hiSRSSNby2pkSTHG4lxiP-EfPQCyvYqyV_Fd-ovhOcIeUPh0InHQgly1jnxcAhiSg34iT8zowf91fOQOizPQvTFhMAtiYdYcayH6hGnKvg8t_rs20LI-I3pfUQ5zhxIYhHfAB5zJ7iAwyn6V31uXgAJetf0M9WF9q0hnzpFGdT2MABD2df50OX2-m2y07ByfONtkml4cn9CgWS5k4CkOM_Fj43urn00u39EqQl6UeylMpMiA"
  constructor(
    private alertMessages: AlertService,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private firebase: AngularFireAuth
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

  storeUserData(data: any) {
    localStorage.setItem('userMeta', JSON.stringify(data));
    this.userInfo = data.user;
    // const token = data.user.stsTokenManager;
    // localStorage.setItem('accessToken', JSON.stringify(token.accessToken));
    localStorage.setItem('accessToken', JSON.stringify(this.token));
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

  refreshToken() {
    console.log('get token')
    // const user = this.firebase.auth.currentUser
    // if (user) {
    //   console.log(user)
    //   // User is signed in.
    // } else {
    //   console.log('no user')
    //   // No user is signed in.
    // }
    // });
    // return this.firebase.authState.pipe(
    //   take(1),
    //   switchMap((user) => {
    //     if (user) {
    //       console.log(user.getIdToken(true))
    //       return from(user.getIdToken(true))
    //     }
    //     return of(null);
    //   })
    // )
    // console.log(this.firebase.auth.currentUser)
    // const user = this.firebase.auth.currentUser

    // if (user) {
    //   console.log(user)
    //   user.getIdToken(true)
    //     .then((token) => {
    //       console.log(token, 'refreshed token');
    //     })
    // }

    this.http.get(APIs.refreshToken)
      .subscribe((data: any) => {
        console.log(data, 'refrershed token');
        // localStorage.setItem('userMeta', JSON.stringify(data));
        // this.userInfo = data.user;
        // const token = data.user.stsTokenManager;
        localStorage.setItem('accessToken', JSON.stringify(data.token));
      })
  }
}
