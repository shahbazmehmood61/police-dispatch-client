import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { ChatService } from "src/app/core/services/chat.service";
import { AuthService } from "src/app/core/services/auth.service";
import {
  IChatRoom,
  ISuggestions,
  IContacts,
  ISingleChatRoomIDs,
} from "src/app/core/models/chat-message.model";
import { AlertService } from "src/app/core/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { TranslatorService } from "src/app/core/services/translator.service";
import { DarkmodeService } from "src/app/core/services/darkmode.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, OnDestroy {
  suggestions: ISuggestions;
  suggestionsError: string;
  searchEmail: string;
  contacts: Array<IContacts> = [];
  message: string;
  members = [];
  groupName: string;
  view = 0;
  selectedSingleChat: ISingleChatRoomIDs;

  constructor(
    public chatService: ChatService,
    public authService: AuthService,
    private alertService: AlertService,
    public translator: TranslatorService,
    public darkmode: DarkmodeService
  ) {}

  ngOnInit() {
    // this.chatService.getPermissions();
    // this.chatService.reciveMessages();
    this.chatService.getChatRoomIDs();
  }

  ngOnDestroy() {
    this.chatService.chatRoomIDs = [];
    this.chatService.chatRoom = [];
    this.contacts = [];
    this.suggestions = null;
    this.suggestionsError = null;
    this.message = null;
    this.searchEmail = null;
    this.chatService.updateFcmTokenNode(null);
  }

  sendMessages() {
    const body = {
      text: this.message,
      timeStamp: "",
      chatID: this.chatService.selectChatID,
      senderID: this.chatService.userMeta.uid,
      reciverID: this.selectedSingleChat.reciverID,
    };

    this.chatService.sendMessages(body).subscribe((res: IChatRoom) => {
      this.chatService.chatRoom.push({ ...res, timeStamp: Date.now() });
    });
    this.message = undefined;
  }

  search(email: string) {
    if (email) {
      this.chatService.searchUser(email).subscribe(
        (resp: any) => {
          this.suggestions = {
            email: resp.email,
            uid: resp.uid,
            name: resp.name,
            picture: resp.picture,
          };
        },
        (error) => {
          this.suggestionsError = error.error.message;
        }
      );
    } else {
      this.suggestionsError = "Please enter email address";
    }
  }

  appendinChatList() {
    this.searchEmail = undefined;

    this.chatService
      .genrateChatRoomIDs({
        senderID: this.chatService.userMeta.uid,
        reciverID: this.suggestions.uid,
        senderName: this.chatService.userMeta.displayName
          ? this.chatService.userMeta.displayName
          : this.chatService.userMeta.email,
      })
      .subscribe(
        (chatRoom: ISingleChatRoomIDs) => {
          this.chatService.chatRoomIDs.push(chatRoom);
          this.suggestions = undefined;
        },
        () => {
          this.suggestions = undefined;
        }
      );
  }

  createGroup() {
    let body = {
      adminID: "",
      groupName: this.groupName,
      members: [],
      recentMessages: {
        message: "",
        sender: "",
      },
    };
    for (const member of this.members) {
      body.members.push(member.uid);
    }

    this.chatService.createGroup(body).subscribe(() => {
      this.alertService.successAlert(
        this.alertService.groupChat.title,
        this.alertService.groupChat.msg
      );
      this.members = [];
      this.groupName = undefined;
      this.searchEmail = undefined;
      this.suggestions = undefined;
      this.suggestionsError = undefined;
      body = undefined;
      this.chatService.getGroups();
    });
  }

  addUsersToCreateGroup() {
    if (this.suggestions) {
      this.members.push(this.suggestions);
    }
    this.suggestions = undefined;
  }

  viewClick(view) {
    this.view = view.index;
    if (this.view === 1 && this.chatService.groupChatRoom.length === 0) {
      this.chatService.getGroups();
    }
  }

  sendGroupMessage() {
    this.chatService.sendGroupMessage(this.message).subscribe(() => {});
    this.message = undefined;
  }

  getMessages(chatRoom: ISingleChatRoomIDs) {
    this.selectedSingleChat = chatRoom;
    this.chatService.getMessages(chatRoom.chatID);
  }

  closeChat(chatRoom: ISingleChatRoomIDs) {
    if (confirm("Are you sure to close?")) {
      this.chatService
        .closeChat(chatRoom.chatID, chatRoom.reciverID, chatRoom.chatNodeID)
        .subscribe((data) => {
          this.alertService.successAlert(
            this.alertService.chatClosed.success,
            ""
          );
          this.chatService.getChatRoomIDs();
        });
    }
  }
}
