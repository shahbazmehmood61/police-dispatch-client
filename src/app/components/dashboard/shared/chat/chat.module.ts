import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ChatComponent } from "./chat.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { ShortenModule } from "src/app/core/pipes/shorten/shorten.module";
import { LocalizationModule } from "src/app/components/shared/localization/localization.module";

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
})
export class ChatModule {}
