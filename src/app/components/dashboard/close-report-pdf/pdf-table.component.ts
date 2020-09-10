import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { IncidentReportService } from "src/app/core/services/incident-report.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { IncidentReportCloseForm } from 'src/app/core/forms/dashboard/incident-report-close-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: "app-pdf-table",
  templateUrl: "./pdf-table.component.html",
  styleUrls: ["./pdf-table.component.css"],
})
export class PdfTableComponent implements OnInit {
  @ViewChild("pdf", { static: false }) pdf: ElementRef;
  key;
  report;
  closeReportForm: FormGroup;;
  // @Input("report") report;
  constructor(
    private incidentReport: IncidentReportService,
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    public closeForm: IncidentReportCloseForm
  ) {
    this.key = route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.incidentReport.getClosedReport(this.key).subscribe((rep) => {
      this.report = rep;
    });
  }

  dateFormat(value) {
    if (value) {
      return new Date(value).toISOString().substring(0, 10);
    } else {
      return 'N/A';
    }
  }

  check(value) {
    return value ? value : "N/A";
  }

  back() {
    this.location.back();
  }

}
