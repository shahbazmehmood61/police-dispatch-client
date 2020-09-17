import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIs } from '../constants/apis';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SosService {
  sosCall: any = new BehaviorSubject([]);
  userInfo;
  sosCalls = new BehaviorSubject([]);
  sosChats = new BehaviorSubject([]);
  constructor(
    private http: HttpClient,
    public db: AngularFireDatabase
  ) { }

  getSosCalls(cityCode: string) {
    // return this.http.get(APIs.getSosCall + cityCode);
    this.db.object('/SOSCalls/' + cityCode).valueChanges().subscribe(
      (res: any) => {
        if (res) {
          const keys = Object.keys(res);
          const calls = [];
          for (let key of keys) {
            calls.push({ key, ...res[key] })
          }
          console.log(calls)
          this.sosCalls.next(calls);
        }
      }
    );
  }

  getSosChats(cityCode: string) {
    // return this.http.get(APIs.getSosChat + cityCode);
    // getSosChat() {
    this.db.object('/SOSChats/' + cityCode).valueChanges().subscribe(
      (res: any) => {
        if (res) {
          const keys = Object.keys(res);
          const chats = [];
          for (let key of keys) {
            chats.push({ key, ...res[key] })
          }
          console.log(chats)
          this.sosChats.next(chats);
        }
      });
    // }
  }

  removeSosChat(cityCode: string, chatID: string) {
    return this.http.get(APIs.removeSosChat + cityCode + '/' + chatID);
  }

  removeSosCall(cityCode: string, callID: string) {
    return this.http.get(APIs.removeSosCall + cityCode + '/' + callID);
  }
}
