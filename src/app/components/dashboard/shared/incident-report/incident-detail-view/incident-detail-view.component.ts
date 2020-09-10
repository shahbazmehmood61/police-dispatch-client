import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { IncidentReportService } from "src/app/core/services/incident-report.service";
import { IIncidentReport } from "src/app/core/models/incident-report.model";
import { SearchService } from "src/app/core/services/search.service";
import { DarkmodeService } from "src/app/core/services/darkmode.service";
import { Location } from "@angular/common";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: "app-incident-detail-view",
  templateUrl: "./incident-detail-view.component.html",
  styleUrls: ["./incident-detail-view.component.css"],
})
export class IncidentDetailViewComponent implements OnInit {
  report;
  params;
  constructor(
    private route: ActivatedRoute,
    public searchService: SearchService,
    public incidentReportService: IncidentReportService,
    public darkmode: DarkmodeService,
    public location: Location,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.params = param;
      this.incidentReportService
        .getSingleIncidentDetails(param.victimId, param.id)
        .subscribe((resp) => {
          this.report = { ...resp, ...param };
        });
    });
  }

  openModel(report: object) {
    this.searchService.report.next({
      ...report,
      ...this.params,
      ...this.authService.userInfo,
    });
  }


  updateStatus(victimId, id, value) {
    var data = {
      victimId: victimId,
      id: id,
      status: value,
    };
    this.incidentReportService.updateIncidentReport(data);
  }

  back() {
    this.location.back();
  }
}
