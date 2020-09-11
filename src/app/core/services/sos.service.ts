import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIs } from '../constants/apis';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SosService {
  sosCall: any = new BehaviorSubject([]);
  userInfo;
  sosCalls;
  constructor(
    private http: HttpClient,
  ) { }

  getSosCalls(cityCode: string) {
    return this.http.get(APIs.getSosCall + cityCode);
  }

  getSosChats(cityCode: string) {
    return this.http.get(APIs.getSosChat + cityCode);
  }

  removeSosChat(cityCode: string, chatID: string) {
    return this.http.get(APIs.removeSosChat + cityCode + '/' + chatID);
  }

  removeSosCall(cityCode: string, callID: string) {
    return this.http.get(APIs.removeSosCall + cityCode + '/' + callID);
  }
}
