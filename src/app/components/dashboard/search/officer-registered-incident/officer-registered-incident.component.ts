import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { IncidentReportService } from "src/app/core/services/incident-report.service";
import { SearchService } from "src/app/core/services/search.service";
import { TranslatorService } from "src/app/core/services/translator.service";
import { Route } from "@angular/compiler/src/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { reportTypes } from '../../../../core/constants/report-types'

@Component({
  selector: "app-officer-registered-incident",
  templateUrl: "./officer-registered-incident.component.html",
  styleUrls: ["./officer-registered-incident.component.css"],
})
export class OfficerRegisteredIncidentComponent implements OnInit {
  displayedColumns: string[] = [
    "View",
    "Actions",
    "Status",
    "Types of incident",
    "Telephone",
    "Victim Location",
    "Incident date",
    "Incident time",
    "Patrol dispatch time",
    "Dispatched patrol",
    "Location of incident",
    "Level of Aggressiveness",
    "People involved",
    "Necessary resources",
  ]
  incidentReports: any;
  filterReports: any;
  modelName = "assignModel";
  modalHeading = "Assign Report";
  report;
  reportType;
  selectReportType;
  status;
  incidentType;
  dataSource;
  // @ViewChild("pdf", { static: false }) pdf: ElementRef;
  constructor(
    public authService: AuthService,
    private incidentReport: IncidentReportService,
    private searchService: SearchService,
    private translator: TranslatorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reportType = reportTypes;
  }

  ngOnInit() {
    const id = this.authService.userInfo.uid;
    this.incidentReport.getOfficerRegisteredReports(id).subscribe((data) => {
      if (data) {
        this.incidentReports = data.reverse();
        this.filterReports = data.reverse();
        this.dataSource = new MatTableDataSource(this.incidentReports)
        this.statusFilter("open");
        this.incidentTypeFilter('none');
      }
    });
  }

  statusFilter(value: any) {
    this.status = value;
    if (this.selectReportType !== 'none' && this.selectReportType !== undefined) {
      this.incidentReports = this.filterReports.filter(
        (data: any) => data.status === value && data.typeOfReport === this.selectReportType
      );
      this.dataSource = new MatTableDataSource(this.incidentReports)
    } else {
      this.incidentReports = this.filterReports.filter(
        (data: any) => data.status === value
      );
      this.dataSource = new MatTableDataSource(this.incidentReports)
    }
  }

  incidentTypeFilter(value) {
    this.selectReportType = value;
    if (this.selectReportType !== "none" && this.selectReportType != undefined) {
      this.incidentReports = this.filterReports.filter(
        (data: any) => data.typeOfReport === this.selectReportType && data.status === this.status
      );
      this.dataSource = new MatTableDataSource(this.incidentReports)
    } else {
      this.incidentReports = this.filterReports.filter(
        (data: any) => data.status === this.status
      );
      this.dataSource = new MatTableDataSource(this.incidentReports);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  check(value) {
    return value ? value : "N/A";
  }

  openModel(report: object) {
    this.searchService.report.next({ ...report, ...this.authService.userInfo });
  }

  public closedReport(key: String): void {
    // this.incidentReport.getClosedReport(key).subscribe((rep) => {
    //   console.log(rep);
    //   this.router.navigate(["pdf-table"], { relativeTo: this.route });
    // });
  }

  generatePDF(pdf, key) {
    // console.log(pdf, key);
    // this.searchService.pdfReport.next(key);
    // this.incidentReport.getClosedReport(key).subscribe((rep) => {
    //   this.report = rep;
    //   console.log(rep);
    // if (rep) {
    //   pdf.saveAs("shah.pdf");
    // }
    // console.log(rep);
    // this.router.navigate(["/pdf-table"], { relativeTo: this.route });
    // });
    // pdf.saveAs("shah.pdf");
  }
}
