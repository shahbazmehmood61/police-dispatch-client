import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { VictimDetailComponent } from "./victim-detail.component";
// import { GoogleMapsModule } from "@angular/google-maps";
import { MaterialModule } from "src/app/material.module";
import { LocalizationModule } from "src/app/components/shared/localization/localization.module";

import { AgmCoreModule } from "@agm/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from 'src/app/core/guards/interceptor';
import { LoaderInterceptor } from 'src/app/core/guards/loader.interceptor';

const routes: Routes = [{ path: "", component: VictimDetailComponent }];

@NgModule({
  declarations: [VictimDetailComponent],
  imports: [
    CommonModule,
    // GoogleMapsModule,
    LocalizationModule,
    MaterialModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBMUlm_C5ZGtcOr5FPqA8WszQebnJGolOA",
      // AIzaSyBMUlm_C5ZGtcOr5FPqA8WszQebnJGolOA next
      // AIzaSyAFyXq1Y2l7l8wsVUQyAAgFAgxkw2le_FA previous
    }),
  ],
  providers: [
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
  ]
})
export class VictimDetailModule { }
