import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CitiesComponent } from './cities/cities.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterCitiesComponent } from './register-cities/register-cities.component';
import { RegisterOfficerComponent } from './register-officer/register-officer.component';

const routes: Routes = [
  { path: "", redirectTo: "/admin/register-officer", pathMatch: "full" },
  {
    path: "", component: LayoutComponent, children: [
      { path: "register-officer", component: RegisterOfficerComponent },
      { path: "register-city", component: RegisterCitiesComponent },
      { path: "cities", component: CitiesComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouterModule { }