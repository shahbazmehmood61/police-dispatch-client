import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ChatHistoryComponent } from "./chat-history.component";
import { LocalizationModule } from "src/app/components/shared/localization/localization.module";

const routes: Routes = [{ path: "", component: ChatHistoryComponent }];

@NgModule({
  declarations: [ChatHistoryComponent],
  imports: [CommonModule, RouterModule.forChild(routes), LocalizationModule],
  // exports: [ChatHistoryComponent]
})
export class ChatHistoryModule {}
