import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChatService } from "src/app/core/services/chat.service";
import { ISingleChatRoomIDs } from "src/app/core/models/chat-message.model";
import { SearchService } from "src/app/core/services/search.service";
import { TranslateService } from "@ngx-translate/core";
import { TranslatorService } from "src/app/core/services/translator.service";
import { DarkmodeService } from "src/app/core/services/darkmode.service";

@Component({
  selector: "app-chat-history",
  templateUrl: "./chat-history.component.html",
  styleUrls: ["./chat-history.component.css"],
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  selectedSingleChat: ISingleChatRoomIDs;
  victimID;

  constructor(
    public chatService: ChatService,
    public searchService: SearchService,
    // public translate: TranslateService,
    public translator: TranslatorService,
    public darkmode: DarkmodeService
  ) {}

  ngOnInit() {
    if (this.searchService.currentMessage != undefined) {
      this.searchService.currentMessage.subscribe(
        (victimID) => (this.victimID = victimID)
      );
      this.chatService.getChatRoomIDsForChatHistory(this.victimID);
    }
  }

  ngOnDestroy() {
    this.chatService.chatRoom = [];
  }

  getMessages(chatRoom: ISingleChatRoomIDs) {
    this.selectedSingleChat = chatRoom;
    this.chatService.getMessagesforClosedChat(chatRoom.chatID);
  }
}
