import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PopupModalComponent } from "./popup-modal.component";
import { MaterialModule } from "src/app/material.module";

@NgModule({
  declarations: [PopupModalComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PopupModalComponent],
})
export class PopupModalModule {}
