import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PopupModalComponent } from "./popup-modal.component";
import { MaterialModule } from "src/app/material.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from 'src/app/core/guards/interceptor';

@NgModule({
  declarations: [PopupModalComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PopupModalComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ]
})
export class PopupModalModule { }
