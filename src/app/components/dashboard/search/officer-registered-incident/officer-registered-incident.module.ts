import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OfficerRegisteredIncidentComponent } from "./officer-registered-incident.component";
import { Routes, RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material.module";
import { LocalizationModule } from "src/app/components/shared/localization/localization.module";
import { NgxPrintModule } from "ngx-print";

const routes: Routes = [
  { path: "", component: OfficerRegisteredIncidentComponent },
];

@NgModule({
  declarations: [OfficerRegisteredIncidentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    LocalizationModule,
    NgxPrintModule,
  ],
})
export class OfficerRegisteredIncidentModule {}