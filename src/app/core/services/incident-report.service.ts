import { Injectable } from "@angular/core";
import { IIncidentReport } from "../models/incident-report.model";
import { HttpClient } from "@angular/common/http";
import { APIs } from "../constants/apis";
import { Observable } from "rxjs";
import { AlertService } from "./alert.service";

@Injectable({
  providedIn: "root",
})
export class IncidentReportService {
  reports: Array<IIncidentReport>;
  constructor(private http: HttpClient, public alert: AlertService) { }

  registerIncident(form, ID: string, sosCall: string) {
    const data = {
      body: form,
      id: ID,
      sosCallId: sosCall,
      city: "Guaynabo"
    };
    return this.http.post(APIs.registerIncident, data);
  }

  getIncidentDetails(id: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get<Array<IIncidentReport>>(APIs.getIncidentReports + "/" + id)
        .subscribe(
          (resp) => {
            this.reports = resp;
            resolve(resp);
          },
          () => {
            this.reports = undefined;
            reject(undefined);
          }
        );
    });
  }

  getSingleIncidentDetails(victimID: string, incidentID: string) {
    return this.http.get<IIncidentReport>(
      APIs.getSingleIncidentDetails + "/" + victimID + "/" + incidentID
    );
  }

  getOfficerRegisteredReports(id): Observable<any[]> {
    return this.http.get<any[]>(APIs.getOfficerRegisteredReports + "/" + id);
  }

  updateIncidentReport(data) {
    return this.http.post(APIs.updateIncidentReport, data);
  }

  getClosedReport(key: String) {
    return this.http.get(APIs.getClosedReport + "/" + key);
  }
}
