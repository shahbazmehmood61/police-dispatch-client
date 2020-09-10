import * as firebase from 'firebase';
import { APIs } from '../constants/apis';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IChatRoom, ISingleChatRoomIDs } from '../models/chat-message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messaging = firebase.messaging();
  userMeta;
  selectChatID: string;
  selectChatGID: string;

  chatRoomIDs: Array<ISingleChatRoomIDs> = [];
  chatRoom: Array<IChatRoom> = [];

  groupChatRoom: Array<any> = [];
  groupChatRoomMsgs: Array<any> = [];

  closedChatRoomIDs: Array<ISingleChatRoomIDs> = []
  sosCalls = new Subject();
  sosChats = new Subject();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userMeta = JSON.parse(this.cookieService.get('userMeta')).user;
  }

  getPermissions() {
    this.messaging
      .requestPermission()
      .then(() => {
        return this.messaging.getToken();
      })
      .then((permissionToken) => {
        console.log(permissionToken);
        this.updateFcmTokenNode(permissionToken);
      })
      .catch((error) => { });
  }

  updateFcmTokenNode(permissionToken: string) {
    const body = { token: permissionToken, uid: this.userMeta.uid };
    this.http.post(APIs.updateMessagingToken, body).subscribe((res) => { });
  }

  reciveMessages() {
    this.messaging.onMessage((payload) => {
      console.log(payload);

      const data = payload.data;
      if (data.notification === 'groupchat') {
        this.bindGroupChatNotfication(data);
      } else if (data.notification === 'singleChat') {
        this.chatRoom.push(payload.data);
      } else if (data.notification === 'sosChat') {
        this.sosChats.next(data);
      } else if (data.notification === 'sosCall') {
        this.sosCalls.next(data);
      }
    });
  }

  // ================== Firebase Fucntions Above
  searchUser(Email: string) {
    return this.http.post(APIs.searchByEmail, { email: Email });
  }

  getUserByID(uid) {
    return this.http.get(APIs.searchByUID + '/' + uid);
  }

  // ==================================== Single Chat
  genrateChatRoomIDs(body: object) {
    return this.http.post(APIs.genrateChatRoomIDs, body);
  }

  sendMessages(body) {
    return this.http.post(APIs.sendMessage, body);
  }

  getChatRoomIDs() {
    this.chatRoomIDs = [];
    return this.http
      .get<Array<ISingleChatRoomIDs>>(
        APIs.getChatRoomIDs + '/' + this.userMeta.uid
      ).subscribe((resp) => {
        this.chatRoomIDs = resp.reverse();
      });
  }

  getMessages(chatID: string) {
    this.chatRoom = [];
    this.selectChatID = chatID;

    this.http.get(APIs.getMessage + chatID).subscribe(
      (messages: any) => {
        this.chatRoom = [];
        const resp = messages.chat;
        const messagesKeys = Object.keys(resp);

        for (const key of messagesKeys) {
          this.chatRoom.push({
            msgNodeID: key,
            ...resp[key],
          });
        }
      },
      () => {
        this.chatRoom = [];
      }
    );
  }

  // =============== Close chat ===============
  closeChat(cID: string, recieverID: string, cNodeID: string) {
    return this.http.post(APIs.closeChat, {
      officerID: this.userMeta.uid,
      victimID: recieverID,
      chatID: cID,
      chatNodeID: cNodeID,
    });
  }
  // =============== Group Chat
  createGroup(details) {
    details.adminID = this.userMeta.uid;
    details.members.push(this.userMeta.uid);
    return this.http.post(APIs.createGroup, details);
  }

  sendGroupMessage(messageText: string) {
    return this.http.post(APIs.sendGroupMessage + this.selectChatGID, {
      message: messageText,
      senderID: this.userMeta.uid,
      senderEmail: this.userMeta.email,
    });
  }

  getGroups() {
    return this.http
      .get(APIs.getGroups + this.userMeta.uid)
      .subscribe((resp: any) => {
        this.groupChatRoom = resp;
      });
  }

  getGroupsMessages(GID: string) {
    this.selectChatGID = GID;
    this.http.get(APIs.getGroupMessages + GID).subscribe(
      (resp: any) => {
        if (resp.messages) {
          this.groupChatRoomMsgs = [];
          const response = resp.messages;
          const keys = Object.keys(response);
          for (const key of keys) {
            for (const member of resp.members) {
              if (member.uid === response[key].senderID) {
                this.groupChatRoomMsgs.push({
                  chatID: key,
                  senderEmail: member.email,
                  ...response[key],
                });
              }
            }
          }
        } else {
          this.groupChatRoomMsgs = [];
        }
      },
      () => {
        this.groupChatRoomMsgs = [];
      }
    );
  }

  bindGroupChatNotfication(data) {
    this.groupChatRoomMsgs.push({
      chatID: data.chatID,
      senderEmail: data.senderEmail,
      message: data.text,
      timeStamp: data.timeStamp,
      senderID: data.senderID,
    });
    for (const group of this.groupChatRoom) {
      if (group.GID === data.GID) {
        group.recentMessages = {
          message: data.text,
          sender: data.senderEmail,
        };
      }
    }
  }

  // ======== Chat History =====
  getChatRoomIDsForChatHistory(victimID: string) {
    this.closedChatRoomIDs = [];
    return this.http
      .get<Array<ISingleChatRoomIDs>>(
        APIs.closeChatRoomIds + this.userMeta.uid + '/' + victimID
      )
      .subscribe((resp) => {
        this.closedChatRoomIDs = resp;
      });
  }
  getMessagesforClosedChat(chatID: string) {
    this.chatRoom = [];
    this.selectChatID = chatID;

    this.http.get(APIs.getClosedtMessage + chatID).subscribe(
      (messages: any) => {
        this.chatRoom = [];
        const resp = messages.chat;
        const messagesKeys = Object.keys(resp);

        for (const key of messagesKeys) {
          this.chatRoom.push({
            msgNodeID: key,
            ...resp[key],
          });
        }
      },
      () => {
        this.chatRoom = [];
      }
    );
  }
}
