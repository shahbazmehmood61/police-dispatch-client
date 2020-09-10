// ======================== Modules
import { CommonModule } from "@angular/common";
import { GoogleMapsModule } from "@angular/google-maps";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { PrintErrorModule } from "../../shared/print-error/print-error.module";
import { PopupModalModule } from "../../shared/popup-modal/popup-modal.module";
import { ShortenModule } from "src/app/core/pipes/shorten/shorten.module";

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
  ],
  providers: [
    AlertService,
    SearchService,
    IncidentReportService,
    IncidentReportCloseForm,
    RegisterVictimForm,
    SosService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
