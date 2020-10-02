import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentReportComponent } from './incident-report.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { LocalizationModule } from 'src/app/components/shared/localization/localization.module';
// import { PopupModalModule } from 'src/app/components/shared/popup-modal/popup-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from 'src/app/core/guards/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/app/core/guards/loader.interceptor';

const routes: Routes = [{ path: '', component: IncidentReportComponent }];

@NgModule({
  declarations: [
    IncidentReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    LocalizationModule,
    // PopupModalModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class IncidentReportModule { }
