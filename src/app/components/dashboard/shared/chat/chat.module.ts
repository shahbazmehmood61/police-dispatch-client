import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ChatComponent } from "./chat.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { ShortenModule } from "src/app/core/pipes/shorten/shorten.module";
import { LocalizationModule } from "src/app/components/shared/localization/localization.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from 'src/app/core/guards/interceptor';
import { LoaderInterceptor } from 'src/app/core/guards/loader.interceptor';

const routes: Routes = [{ path: "", component: ChatComponent }];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LocalizationModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ShortenModule,
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
export class ChatModule { }
