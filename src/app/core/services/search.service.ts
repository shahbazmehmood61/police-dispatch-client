import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APIs } from "../constants/apis";
import { IVictims } from "../models/victims.model";
import { IncidentReportService } from "./incident-report.service";
import { ChatService } from "./chat.service";
import { BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { AlertService } from './alert.service';

@Injectable({
  providedIn: "root",
})
export class SearchService {
  public victimDetails;
  viewVictimDetail;
  editVictimDetail = new BehaviorSubject({});
  public victimID: string;
  singleVictim = false;
  messageSource;
  currentMessage;
  callDetail = new BehaviorSubject({});
  report = new BehaviorSubject({});
  pdfReport = new BehaviorSubject({});
  public sosCallId;

  constructor(
    private http: HttpClient,
    private router: Router,
    private incidentReportService: IncidentReportService,
    public chatService: ChatService,
    public alertService: AlertService
  ) { }

  registerUser(form) {
    return this.http.post(APIs.registerUser, form);
  }

  getRegisteredUser() {
    return this.http.get(APIs.getRegisteredVictims);
  }

  getSingleVictim({ id, node }) {
    this.messageSource = new BehaviorSubject(id);
    this.currentMessage = this.messageSource.asObservable();
    this.victimID = id;
    this.singleVictim = true;

    return this.http.get(APIs.getSingleVictim + "/" + id + "/" + node);
    // .subscribe(
    //   (resp) => {
    //     this.router.navigate(["/search/victim-detail"]);
    //     this.victimDetails = { ...resp, id, node };
    //     // this.editVictimDetail.next({ ...resp, id, node });
    //     // this.editVictimDetail = { ...resp, id, node }
    //     this.incidentReportService.getIncidentDetails(id);
    //     resolve(resp);
    //   },
    //   () => {
    //     reject();
    //   }
    // );
  }


  getSosCallSingleVictim(id: string, node: string, call) {
    this.viewVictimDetail = undefined;
    this.victimID = id;
    this.sosCallId = call.nodeID;
    this.singleVictim = false;
    this.http
      .get(APIs.getSingleVictim + "/" + id + "/" + node)
      .subscribe((res) => {
        this.router.navigate(["/incident/victim-detail"]);
        this.victimDetails = { ...res, id, node };
        this.callDetail.next(call);
      });
  }

  updateStatus(victimId, ID, Status) {
    const data = {
      victimId: victimId ? victimId : this.victimID,
      id: ID,
      status: Status,
    };
    this.incidentReportService.updateIncidentReport(data)
      .subscribe((resp: any) => {
        this.alertService.successAlert(resp.msg, '');
        this.incidentReportService.getIncidentDetails(this.victimID);
      });
  }
}
