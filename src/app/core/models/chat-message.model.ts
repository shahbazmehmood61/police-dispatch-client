export class ChatMessage {
  $key?: string;
  email?: string;
  userName?: string;
  message?: string;
  timeSent?: Date = new Date();
}

export interface ISuggestions {
  email: string;
  uid: string;
  name: string;
  picture: string;
}

export interface IContacts {
  email: string;
  uid: string;
  name: string;
  picture: string;
  lastChatedTime: string;
  lastText: string;
}

export interface IChat {
  userId: string;
  userName: string;
  userPicUrl: string;
  lastMessage: string;
  lastChatedTime: number;
  chatRoom: Array<IChatRoom>;
}

export interface IChatRoom {
  msgNodeID: string;
  reciverID: string;
  senderID: string;
  text: string;
  timeStamp: any;
}

export interface ISingleChatRoomIDs {
  chatID: string;
  chatNodeID: string;
  lastMsg: string;
  reciverID: string;
  reciverName: string;
  timeStamp: string;
}

