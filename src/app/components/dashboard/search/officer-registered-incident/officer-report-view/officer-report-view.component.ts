import { Component, OnInit } from '@angular/core';
import { IncidentReportService } from 'src/app/core/services/incident-report.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DarkmodeService } from 'src/app/core/services/darkmode.service';

@Component({
  selector: 'app-officer-report-view',
  templateUrl: './officer-report-view.component.html',
  styleUrls: ['./officer-report-view.component.css'],
})
export class OfficerReportViewComponent implements OnInit {
  report;
  updated = false;
  constructor(
    private incidentReportService: IncidentReportService,
    private route: ActivatedRoute,
    public darkmode: DarkmodeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.incidentReportService
        .getSingleIncidentDetails(param.victimId, param.id)
        .subscribe((resp) => {
          this.report = { ...resp, ...param };
        });
    });
  }

  updateStatus(VID, ID, value) {
    const data = {
      victimId: VID,
      id: ID,
      status: value,
    };
    this.incidentReportService.updateIncidentReport(data);
    this.updated = true;
  }
}
