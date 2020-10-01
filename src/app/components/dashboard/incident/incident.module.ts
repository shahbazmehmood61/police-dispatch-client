import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentComponent } from './incident.component';
import { Routes, RouterModule } from '@angular/router';
import { RegIncidentReportComponent } from './reg-incident-report/reg-incident-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { PrintErrorModule } from '../../shared/print-error/print-error.module';
import { RegisterIncidentReportForm } from 'src/app/core/forms/dashboard/register-incident-report-form';
import { LocalizationModule } from '../../shared/localization/localization.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from 'src/app/core/guards/interceptor';
import { LoaderInterceptor } from 'src/app/core/guards/loader.interceptor';

const routes: Routes = [
  {
    path: '',
    component: IncidentComponent,
    children: [
      { path: '', redirectTo: '/incident/victim-detail', pathMatch: 'full' },

      {
        path: 'victim-detail',
        loadChildren: () =>
          import('../shared/victim-detail/victim-detail.module').then(
            (m) => m.VictimDetailModule
          ),
      },
      {
        path: 'incident-history',
        loadChildren: () =>
          import('../shared/incident-report/incident-report.module').then(
            (m) => m.IncidentReportModule
          ),
      },
      {
        path: 'chat-history',
        loadChildren: () =>
          import('../search/chat-history/chat-history.module').then(
            (m) => m.ChatHistoryModule
          ),
      },
      { path: 'report-incident', component: RegIncidentReportComponent },
    ],
  },
];
@NgModule({
  declarations: [RegIncidentReportComponent, IncidentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrintErrorModule,
    LocalizationModule,
  ],
  providers: [RegisterIncidentReportForm,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
})
export class IncidentModule { }
