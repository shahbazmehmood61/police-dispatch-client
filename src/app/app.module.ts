// ======================== Modules
import { NgModule } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { MaterialModule } from "./material.module";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PrintErrorModule } from "./components/shared/print-error/print-error.module";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
// ======================== Services & Guards
import { CookieService } from "ngx-cookie-service";
import { SigninForm } from "./core/forms/auth/login-form";
import { AuthBeforeLoginGuard } from "./core/guards/auth-before-login.guard";
import { AuthAfterLoginGuard } from "./core/guards/auth-after-login.guard";

// ======================== Components
import { AppComponent } from "./app.component";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { HeaderComponent } from "./components/core/header/header.component";
import { Page404Component } from "./components/shared/page404/page404.component";
import * as firebase from "firebase";
import { firebaseConfig } from "./core/firebase";
import { Interceptor } from "./core/guards/interceptor";

import { LocalizationModule } from "./components/shared/localization/localization.module";
import { FormaterPipe } from "./core/pipes/formater.pipe";
import { TranslatorService } from "./core/services/translator.service";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PdfTableComponent } from "./components/dashboard/close-report-pdf/pdf-table.component";
import { LoaderComponent } from './components/shared/loader/loader.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { LoaderInterceptor } from './core/guards/loader.interceptor';
export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    Page404Component,
    PdfTableComponent,
    LoaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    PrintErrorModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LocalizationModule,
    HttpClientModule,
    PDFExportModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BsDatepickerModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    SigninForm,
    CookieService,
    AuthAfterLoginGuard,
    FormaterPipe,
    AuthBeforeLoginGuard,
    TranslatorService,
    LoaderComponent,
    // LocalizationModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
