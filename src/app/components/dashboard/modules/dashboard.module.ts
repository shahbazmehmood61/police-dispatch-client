// ======================== Modules
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { PopupModalModule } from "../../shared/popup-modal/popup-modal.module";
// import { GoogleMapsModule } from '@angular/google-maps';

// ======================== Services, Guards And Forms
import { AlertService } from "src/app/core/services/alert.service";
import { SearchService } from "src/app/core/services/search.service";
import { RegisterVictimForm } from "src/app/core/forms/dashboard/register-victim-form";
import { IncidentReportService } from "src/app/core/services/incident-report.service";
import { IncidentReportCloseForm } from "src/app/core/forms/dashboard/incident-report-close-form";

// ======================== Components
import { DashboardComponent } from "../dashboard.component";
import { SettingComponent } from "../setting/setting.component";
import { LocationComponent } from "../location/location.component";
import { DashboardSidebarComponent } from "../dashboard-sidebar/dashboard-sidebar.component";
import { IncidentDetailViewComponent } from "../shared/incident-report/incident-detail-view/incident-detail-view.component";
import { SosSidebarComponent } from "../sos-sidebar/sos-sidebar.component";
import { SosService } from "src/app/core/services/sos.service";
import { LocalizationModule } from "../../shared/localization/localization.module";
import { OfficerReportViewComponent } from "../search/officer-registered-incident/officer-report-view/officer-report-view.component";
import { MaterialModule } from "src/app/material.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from 'src/app/core/guards/interceptor';
import { LoaderInterceptor } from 'src/app/core/guards/loader.interceptor';

@NgModule({
  declarations: [
    SettingComponent,
    LocationComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    IncidentDetailViewComponent,
    SosSidebarComponent,
    OfficerReportViewComponent,
  ],
  imports: [
    CommonModule,
    PopupModalModule,
    DashboardRoutingModule,
    LocalizationModule,
    MaterialModule,
    // GoogleMapsModule
  ],
  providers: [
    AlertService,
    SearchService,
    IncidentReportService,
    IncidentReportCloseForm,
    RegisterVictimForm,
    SosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
