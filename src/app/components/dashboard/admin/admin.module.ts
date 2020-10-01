import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRouterModule } from './admin.routing.module';
import { LayoutComponent } from './layout/layout.component';
import { RegisterOfficerComponent } from './register-officer/register-officer.component';
import { AdminNavigatorComponent } from './admin-navigator/admin-navigator.component';
import { MaterialModule } from '../../../material.module';;
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/app/core/guards/loader.interceptor';

@NgModule({
  declarations: [
    LayoutComponent,
    RegisterOfficerComponent,
    AdminNavigatorComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    AdminRouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class AdminModule { }