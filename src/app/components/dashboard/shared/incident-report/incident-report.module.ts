import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentReportComponent } from './incident-report.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { LocalizationModule } from 'src/app/components/shared/localization/localization.module';
// import { PopupModalModule } from 'src/app/components/shared/popup-modal/popup-modal.module';
import { ReactiveFormsModule } from '@angular/forms';

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
  providers: [],
})
export class IncidentReportModule { }
