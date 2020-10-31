import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SigninForm } from 'src/app/core/forms/auth/login-form';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  SigninForm: FormGroup;
  public routePath;

  constructor(
    private router: Router,
    private signinForm: SigninForm,
    public authService: AuthService,
    private alertMessages: AlertService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.SigninForm = this.signinForm.initForm();
  }

  signin() {
    if (this.SigninForm.valid) {
      this.authService.signin(this.SigninForm)
        .subscribe((data: any) => {
          // this.cookieService.set('userMeta', JSON.stringify(data), null, null, null, false, 'Strict');
          localStorage.setItem('userMeta', JSON.stringify(data));
          this.authService.userInfo = data.user;
          const token = data.user.stsTokenManager;
          // this.authService.userName = data.userInfo.name
          // this.cookieService.set('accessToken', JSON.stringify(token.accessToken), null, null, null, false, 'Strict');
          localStorage.setItem('accessToken', JSON.stringify(token.accessToken));

          this.SigninForm.reset();
          this.navigation(data);
          this.alertMessages.successAlert(this.alertMessages.loginAuth.success200, '');
        });
    } else {
      this.alertMessages.warningAlert(this.alertMessages.formErrors.invalidFormTitle, this.alertMessages.formErrors.invalidFormMsg);
    }
  }

  navigation(data: any) {
    const { role } = data.userInfo
    if (role === "chief") {
      console.log('admin')
      this.router.navigate(['/officer']);
    } else {
      this.router.navigate(['search']);
    }
  }
}
