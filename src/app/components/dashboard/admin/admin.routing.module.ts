import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
// import { CitiesComponent } from './cities/cities.component';
// import { LayoutComponent } from './layout/layout.component';
// import { RegisterCitiesComponent } from './register-cities/register-cities.component';
// import { RegisterOfficerComponent } from './register-officer/register-officer.component';

const routes: Routes = [
  {
    path: "", component: AdminSidebarComponent, children: [
      { path: "", redirectTo: "/officer", pathMatch: "full" },
      {
        path: "officer",
        loadChildren: () => import('./officers/officers.module')
          .then((m) => m.OfficersModule)
      },
      {
        path: "city",
        loadChildren: () => import('./city/city.module')
          .then((m) => m.CityModule)
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouterModule { }