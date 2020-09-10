import { SosService } from 'src/app/core/services/sos.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import {
  IChatRoom,
  ISuggestions,
  ISingleChatRoomIDs,
} from 'src/app/core/models/chat-message.model';
import { CookieService } from 'ngx-cookie-service';
import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { IVictims } from 'src/app/core/models/victims.model';
import { TranslatorService } from 'src/app/core/services/translator.service';

@Component({
  selector: 'app-sos-sidebar',
  templateUrl: './sos-sidebar.component.html',
  styleUrls: ['./sos-sidebar.component.css'],
})
export class SosSidebarComponent implements OnInit {
  sosCalls = [];
  sosChats = [];
  isShow = true;
  searchEmail: string;
  suggestions: ISuggestions;
  selectedSingleChat: ISingleChatRoomIDs;

  officerInfo;
  messaging = firebase.messaging();

  chats = [];
  users: Array<IVictims[]> = [];

  constructor(
    private sosService: SosService,
    private router: Router,
    public searchService: SearchService,
    private cookieService: CookieService,
    private chatService: ChatService,
    public translator: TranslatorService
  ) { }

  ngOnInit() {
    this.chatService.getPermissions();
    this.chatService.reciveMessages();

    this.officerInfo = JSON.parse(this.cookieService.get('userMeta')).userInfo;
    this.getSosCall();
    this.getSosChat();
    this.reciveSOSQueue();
  }

  reciveSOSQueue() {
    this.chatService.sosChats.subscribe((data: any) => {
      this.sosChats.push(data);
    });

    this.chatService.sosCalls.subscribe((data: any) => {
      this.sosCalls.push(data);
    });
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  getSosCall() {
    this.sosService.getSosCalls(this.officerInfo.cityCode).subscribe(
      (res: any) => {
        this.sosCalls = res;
      },
      (error: any) => {
        this.sosCalls = [];
      }
    );
  }

  getSosChat() {
    this.sosService.getSosChats(this.officerInfo.cityCode).subscribe(
      (res: any) => {
        this.sosChats = res;
      },
      (error: any) => {
        this.sosChats = [];
      }
    );
  }

  chatClicked(chat) {
    this.searchEmail = undefined;
    this.chatService
      .genrateChatRoomIDs({
        senderID: chat.callerID,
        reciverID: this.chatService.userMeta.uid,
        senderName: chat.callerName,
      })
      .subscribe((chatRoom: ISingleChatRoomIDs) => {
        this.chatService.chatRoomIDs.push(chatRoom);
        chat.chatID = chatRoom.chatID;
        this.sendMessages(chat);
        this.router.navigate(['/inbox']);
      });
  }

  getMessages(chatRoom: ISingleChatRoomIDs) {
    this.selectedSingleChat = chatRoom;
    this.chatService.getMessages(chatRoom.chatID);
  }

  sendMessages(chat) {
    const body = {
      text: chat.chatText,
      timeStamp: '',
      chatID: chat.chatID,
      senderID: chat.callerID,
      reciverID: this.chatService.userMeta.uid,
    };
    this.chatService.sendMessages(body).subscribe((res: IChatRoom) => {
      this.chatService.chatRoom.push({ ...res, timeStamp: Date.now() });
      this.sosService
        .removeSosChat(chat.cityCode, chat.nodeID)
        .subscribe(() => {
          this.getSosChat();
        });
    });
  }

  // callClicked(
  //   callerID: string,
  //   node: string,
  //   cityCode: string,
  //   callID: string
  // ) {
  //   this.searchService.getSingleVictim(callerID, node).then(() => {
  //     this.sosService.removeSosCall(cityCode, callID).subscribe(() => {
  //       this.getSosCall();
  //     });
  //   });
  // }

}
