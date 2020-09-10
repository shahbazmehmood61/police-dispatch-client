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
          this.cookieService.set('userMeta', JSON.stringify(data), null, null, null, false, 'Strict');
          this.authService.userInfo = data.user;
          const token = data.user.stsTokenManager;
          this.cookieService.set('accessToken', JSON.stringify(token.accessToken), null, null, null, false, 'Strict');

          this.SigninForm.reset();
          this.router.navigate(['search']);
          this.alertMessages.successAlert(this.alertMessages.loginAuth.success200, '');
        });
    } else {
      this.alertMessages.warningAlert(this.alertMessages.formErrors.invalidFormTitle, this.alertMessages.formErrors.invalidFormMsg);
    }
  }
}
