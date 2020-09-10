import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { VictimDetailComponent } from "./victim-detail.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { MaterialModule } from "src/app/material.module";
import { LocalizationModule } from "src/app/components/shared/localization/localization.module";

import { AgmCoreModule } from "@agm/core";

const routes: Routes = [{ path: "", component: VictimDetailComponent }];

@NgModule({
  declarations: [VictimDetailComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    LocalizationModule,
    MaterialModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAFyXq1Y2l7l8wsVUQyAAgFAgxkw2le_FA",
    }),
  ],
})
export class VictimDetailModule {}
