import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ChatHistoryComponent } from "./chat-history.component";
import { LocalizationModule } from "src/app/components/shared/localization/localization.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from 'src/app/core/guards/interceptor';
import { LoaderInterceptor } from 'src/app/core/guards/loader.interceptor';

const routes: Routes = [{ path: "", component: ChatHistoryComponent }];

@NgModule({
  declarations: [ChatHistoryComponent],
  imports: [CommonModule, RouterModule.forChild(routes), LocalizationModule],
  // exports: [ChatHistoryComponent]
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class ChatHistoryModule { }
