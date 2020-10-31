import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterOfficerComponent } from './register-officer/register-officer.component';
import { OfficersComponent } from './officers.component';
import { LocalizationModule } from 'src/app/components/shared/localization/localization.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OfficerListComponent } from './officer-list/officer-list.component';

const routes: Routes = [
  {
    path: "", component: OfficersComponent, children: [
      { path: "", redirectTo: '/officer/register-officer', pathMatch: 'full' },
      { path: "register-officer", component: RegisterOfficerComponent },
      { path: "officers-list", component: OfficerListComponent }
    ]
  }
]

@NgModule({
  declarations: [RegisterOfficerComponent, OfficersComponent, OfficerListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LocalizationModule,
    ReactiveFormsModule
  ]
})
export class OfficersModule { }
