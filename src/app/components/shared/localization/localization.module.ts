import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// ======== Popup modal module for assign report
import { PopupModalModule } from '../popup-modal/popup-modal.module';

// ========= incident close report module
import { IncidentCloseModelComponent } from '../../dashboard/shared/incident-report/incident-close-model/incident-close-model.component';

// =============== import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// import ngx-translate-messageformat-compiler
import { TranslatorService } from 'src/app/core/services/translator.service';
import { FormaterPipe } from 'src/app/core/pipes/formater.pipe';
import { MaterialModule } from 'src/app/material.module';
import { IncidentAssignModelComponent } from '../../dashboard/shared/incident-report/incident-assign-model/incident-assign-model.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [FormaterPipe, IncidentCloseModelComponent, IncidentAssignModelComponent],
  imports: [
    CommonModule, // === ngx-translate and the loader module
    HttpClientModule,
    PopupModalModule,
    ReactiveFormsModule,
    MaterialModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [TranslatorService],
  exports: [
    TranslateModule,
    FormaterPipe,
    PopupModalModule,
    IncidentCloseModelComponent,
    IncidentAssignModelComponent,
    MaterialModule,
    BsDatepickerModule,
  ],
})
export class LocalizationModule { }
