import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "../dashboard.component";
import { LocationComponent } from "../location/location.component";
import { SettingComponent } from "../setting/setting.component";
import { IncidentDetailViewComponent } from "../shared/incident-report/incident-detail-view/incident-detail-view.component";
import { MaterialModule } from "src/app/material.module";
import { OfficerReportViewComponent } from "../search/officer-registered-incident/officer-report-view/officer-report-view.component";

const authRouting: Routes = [
  { path: "", redirectTo: "/" + "search", pathMatch: "full" },
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "search",
        loadChildren: () =>
          import("../search/search.module").then((m) => m.SearchModule),
      },
      {
        path: "inbox",
        loadChildren: () =>
          import("../shared/chat/chat.module").then((m) => m.ChatModule),
      },
      {
        path: "incident",
        loadChildren: () =>
          import("../incident/incident.module").then((m) => m.IncidentModule),
      },
      { path: "location", component: LocationComponent },
      { path: "setting", component: SettingComponent },
      {
        path: "incident-details" + "/:id/:victimId",
        component: IncidentDetailViewComponent,
      },
      {
        path: "officer-incident-view" + "/:id/:victimId",
        component: OfficerReportViewComponent,
      },
    ],
  },
];

export const DashboardRoutingModule: ModuleWithProviders = RouterModule.forChild(
  authRouting
);
{
}
