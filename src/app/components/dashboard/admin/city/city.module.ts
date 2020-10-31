import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesComponent } from './cities/cities.component';
import { RegisterCitiesComponent } from './register-cities/register-cities.component'
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city.component';
import { LocalizationModule } from 'src/app/components/shared/localization/localization.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BulkCityComponent } from './bulk-city/bulk-city.component';

const routes: Routes = [
  {
    path: "", component: CityComponent, children: [
      { path: '', redirectTo: '/city/register-city', pathMatch: 'full' },
      { path: "register-city", component: RegisterCitiesComponent },
      { path: "cities", component: CitiesComponent },
      { path: "bulk-cities", component: BulkCityComponent },
    ]
  }
]

@NgModule({
  declarations: [
    CitiesComponent,
    RegisterCitiesComponent,
    CityComponent,
    BulkCityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LocalizationModule,
    ReactiveFormsModule
  ]
})
export class CityModule { }
