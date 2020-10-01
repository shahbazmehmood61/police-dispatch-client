import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../services/alert.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private alertService: AlertService,
    private cookieService: CookieService,
    public loaderService: LoaderService
  ) { }

  addToken(req: HttpRequest<any>, token): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    }
    return req;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    let token = null;
    if (this.cookieService.check('accessToken')) {
      token = JSON.parse(this.cookieService.get('accessToken'));
    }

    return next.handle(this.addToken(request, token)).pipe(
      finalize(() => this.loaderService.hide()),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((error).status) {
            case 400:
              return this.handle400Error(error);
            case 500:
              return this.handle500Error(error);
            default:
              return this.validationFailed(error);
          }
        }
        return observableThrowError(error);
      })
    );
  }

  handle400Error(error) {
    const err = error.error.code;
    this.alertService.errorAlert('Police Dispatch', err);
    return observableThrowError(error);
  }

  handle500Error(error) {
    this.alertService.errorAlert('Internal Server Error', 'Server under maintenance, sorry for inconvenience.');
    return observableThrowError(error);
  }

  validationFailed(error) {
    if (error.status !== 200) {
      this.alertService.errorAlert('Sorry', 'Something went wrong');
      return observableThrowError(error);
    }
    return observableThrowError(null);
  }

}
