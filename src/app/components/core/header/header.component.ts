import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { TranslatorService } from "src/app/core/services/translator.service";
import { DarkmodeService } from "src/app/core/services/darkmode.service";
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  // mode = true;
  language = 'es';
  userName: string
  constructor(
    public authService: AuthService,
    public translator: TranslatorService,
    public darkmode: DarkmodeService,
    public cookieService: CookieService
  ) {
    // console.log(this.cookieService.get('userMeta'));
    // if (this.cookieService.check('userMeta')) {
    //   if (JSON.parse(this.cookieService.get('userMeta')).userInfo) {
    //     this.userName = JSON.parse(this.cookieService.get('userMeta')).userInfo.name
    //   }
    // }
    if (localStorage.getItem('userMeta')) {
      if (JSON.parse(localStorage.getItem('userMeta')).userInfo) {
        this.userName = JSON.parse(localStorage.getItem('userMeta')).userInfo.name
      }
    }

  }

  ngOnInit() {

    this.cookieService.set('token', "");
    this.cookieService.set('accessToken', "");
    if (this.authService.isLoggedIn()) {
      this.authService.userInfo = JSON.parse(
        this.authService.isLoggedIn()
      ).user;
    }

  }

  modeChanged() {

    this.darkmode.mode = !this.darkmode.mode;
    if (!this.darkmode.mode) {
      $("head").append(
        '<link id="darkmode" rel="stylesheet" href="assets/css/dark-mode.css">'
      );
    } else {
      $("#darkmode").remove();
    }
  }
}
