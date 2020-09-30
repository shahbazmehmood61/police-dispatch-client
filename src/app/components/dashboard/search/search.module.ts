import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrintErrorModule } from '../../shared/print-error/print-error.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PopupModalModule } from '../../shared/popup-modal/popup-modal.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from 'src/app/material.module';
import { RegisterVictimComponent } from './register-victim/register-victim.component';
import { SearchVictimComponent } from './search-victim/search-victim.component';
import { Routes, RouterModule } from '@angular/router';
import { LocalizationModule } from '../../shared/localization/localization.module';
import { Interceptor } from 'src/app/core/guards/interceptor';
// import { FormaterPipe } from 'src/app/core/pipes/formater.pipe';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      { path: '', redirectTo: '/search/register-victim', pathMatch: 'full' },
      { path: 'register-victim', component: RegisterVictimComponent },
      { path: 'search-victim', component: SearchVictimComponent },
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
      {
        path: 'victim-detail',
        loadChildren: () =>
          import('../shared/victim-detail/victim-detail.module').then(
            (m) => m.VictimDetailModule
          ),
      },
      {
        path: 'officer-registered-incidents',
        loadChildren: () =>
          import(
            '../search/officer-registered-incident/officer-registered-incident.module'
          ).then((m) => m.OfficerRegisteredIncidentModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    SearchComponent,
    RegisterVictimComponent,
    SearchVictimComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    GoogleMapsModule,
    PopupModalModule,
    HttpClientModule,
    PrintErrorModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LocalizationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ]
})
export class SearchModule { }
