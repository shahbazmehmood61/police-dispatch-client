import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrintErrorComponent } from "./print-error.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

@NgModule({
  declarations: [PrintErrorComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [PrintErrorComponent],
})
export class PrintErrorModule {}
