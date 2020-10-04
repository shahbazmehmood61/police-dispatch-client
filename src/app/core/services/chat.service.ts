import * as firebase from 'firebase';
import { APIs } from '../constants/apis';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IChatRoom, ISingleChatRoomIDs } from '../models/chat-message.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as admin from 'firebase-admin';
// import { auth } from '../constants/admin';

// const auth = admin.auth();

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
  singleChatMesages = new BehaviorSubject([]);
  groupChatMessages = new BehaviorSubject([]);
  selectedSingleChat;

  groupChatRoom: Array<any> = [];
  groupChatRoomMsgs: Array<any> = [];

  closedChatRoomIDs: Array<ISingleChatRoomIDs> = []
  sosCalls = new Subject();
  sosChats = new Subject();
  chatRoomReceiverID;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    public db: AngularFireDatabase,
    public fireAuth: AngularFireAuth
  ) {
    this.userMeta = JSON.parse(this.cookieService.get('userMeta')).user;
  }

  getPermissions() {
    this.messaging
      .requestPermission()
      .then(() => {
        return this.messaging.getToken();
      })
      .then((permissionToken) => {
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

  getMessages(chatRoom: ISingleChatRoomIDs) {
    // this.chatRoom = [];
    this.selectChatID = chatRoom.chatID;
    this.selectedSingleChat = chatRoom.reciverID;

    this.db.object('/singleChatMsgs/' + chatRoom.chatID).valueChanges().subscribe(
      (messages: any) => {
        const chatRoom = [];
        // const resp = messages.chat;
        const messagesKeys = Object.keys(messages);
        this.chatRoomReceiverID = messages[messagesKeys[0]].senderID;
        for (const key of messagesKeys) {
          chatRoom.push({
            msgNodeID: key,
            ...messages[key],
          });
        }
        this.singleChatMesages.next(chatRoom);
      },
      () => {
        this.chatRoom = [];
      }
      // }
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

  getGroupsMessages(chat: any) {
    this.selectChatGID = chat.GID;
    this.db.object('/groupMessage/' + this.selectChatGID).valueChanges()
      .subscribe(
        (resp: any) => {
          if (resp) {
            const groupChatRoomMsgs = [];
            // const response = resp.messages;
            const keys = Object.keys(resp);
            for (const key of keys) {
              // auth.getUser(resp[key].senderID)
              this.db.object('/usersOfficers/' + resp[key].senderID).valueChanges()
                .subscribe((user: any) => {
                  groupChatRoomMsgs.push({
                    chatID: this.selectChatGID,
                    senderEmail: user.email,
                    ...resp[key],
                  });
                })

              this.groupChatMessages.next(groupChatRoomMsgs);
              //   for (const member of resp.members) {
              //     if (member.uid === response[key].senderID) {
              //       this.groupChatRoomMsgs.push({
              //         chatID: this.selectChatGID,
              //         senderEmail: member.email,
              //         ...resp[key],
              //       });
              //     }
              //   }
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
