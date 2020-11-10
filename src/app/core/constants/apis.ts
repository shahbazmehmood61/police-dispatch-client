import { environment } from "src/environments/environment";

export const APIs = {
  // =========== Auth
  signin: environment.baseURL + "auth/signin",
  loginCheck: environment.baseURL + "auth/checkUserLogin",
  logout: environment.baseURL + "auth/logout",
  refreshToken: environment.baseURL + "auth/refreshToken",
  registerOfficer: environment.baseURL + 'auth/registerOfficer',
  getOfficers: environment.baseURL + 'dashboard/getOfficers',

  // =========== Dashboard
  registerUser: environment.baseURL + "dashboard/registerUser",
  getRegisteredVictims: environment.baseURL + "dashboard/getRegisteredVictims",
  getSingleVictim: environment.baseURL + "dashboard/getSingleVictim",
  registerIncident: environment.baseURL + "dashboard/registerIncident",
  getIncidentReports: environment.baseURL + "dashboard/getIncidentReports",
  getSingleIncidentDetails:
    environment.baseURL + "dashboard/getSingleIncidentDetails",
  getOfficerRegisteredReports:
    environment.baseURL + "dashboard/getOfficerRegisteredReports",
  updateIncidentReport: environment.baseURL + "dashboard/updateIncidentReport",
  getClosedReport: environment.baseURL + "dashboard/getClosedReport",

  // =========== messaging
  sendMessage: environment.baseURL + "messaging/sendMessage",
  getMessage: environment.baseURL + "messaging/getMessage/",
  genrateChatRoomIDs: environment.baseURL + "messaging/genrateChatRoomIDs",
  getChatRoomIDs: environment.baseURL + "messaging/getChatRoomIDs",

  updateMessagingToken: environment.baseURL + "messaging/updateMessagingToken",
  searchByEmail: environment.baseURL + "messaging/searchByEmail",
  searchByUID: environment.baseURL + "messaging/searchByUID",

  // =========== Group Chat
  createGroup: environment.baseURL + "messaging/createGroup",
  sendGroupMessage: environment.baseURL + "messaging/sendGroupMessage/",
  getGroups: environment.baseURL + "messaging/getGroups/",
  getGroupMessages: environment.baseURL + "messaging/getGroupMessages/",

  // ============== Close Chat
  closeChat: environment.baseURL + "messaging/closeChat",

  // ============== Chat History
  closeChatRoomIds: environment.baseURL + "messaging/getClosedChatRoomIDs/",
  getClosedtMessage: environment.baseURL + "messaging/getClosedtMessage/",

  // ============== SOS
  getSosCall: environment.baseURL + "dashboard/getSosCall/",
  getSosChat: environment.baseURL + "dashboard/getSosChat/",
  removeSosChat: environment.baseURL + "dashboard/removeSosChat/",
  removeSosCall: environment.baseURL + "dashboard/removeSosCall/",

  //=============== cities
  // registerCity: environment.baseURL + 'dashboard/city'
  city: environment.baseURL + 'dashboard/city'
};
