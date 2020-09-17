import { Component, OnInit, TemplateRef } from "@angular/core";
import { IncidentReportService } from "src/app/core/services/incident-report.service";
import { SearchService } from "src/app/core/services/search.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { reportTypes } from '../../../../core/constants/report-types';

@Component({
  selector: "app-incident-report",
  templateUrl: "./incident-report.component.html",
  styleUrls: ["./incident-report.component.css"],
})
export class IncidentReportComponent implements OnInit {
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
  reports;
  status;
  reportType;
  selectReportType;
  incidentReports;
  filterReports;
  incidentReport;
  dataSource;
  constructor(
    public searchService: SearchService,
    public incidentReportService: IncidentReportService,
    public authService: AuthService,
    public router: Router
  ) {
    this.reportType = reportTypes;
  }

  ngOnInit() {
    if (this.searchService.victimID) {
      this.incidentReportService
        .getIncidentDetails(this.searchService.victimID)
        .then((report: any) => {
          report.reverse()
          this.reports = report;
          this.filterReports = report;
          this.dataSource = new MatTableDataSource(this.reports);
          this.statusFilter("open");
          this.incidentTypeFilter('none');
        })
        .catch(() => {
          this.reports = undefined;
        });
    }
  }

  statusFilter(value: any) {
    this.status = value;
    if (this.selectReportType != 'none' && this.selectReportType != undefined) {
      this.reports = this.filterReports.filter(
        (data: any) => data.status === value && data.typeOfReport === this.selectReportType
      );
      this.dataSource = new MatTableDataSource(this.reports);
    } else {
      this.reports = this.filterReports.filter(
        (data: any) => data.status === value
      );
      this.dataSource = new MatTableDataSource(this.reports);
    }
  }

  incidentTypeFilter(value) {
    this.selectReportType = value;
    if (this.selectReportType != "none" && this.selectReportType != undefined) {
      this.reports = this.filterReports.filter(
        (data: any) => data.typeOfReport === this.selectReportType && data.status === this.status
      );
      this.dataSource = new MatTableDataSource(this.reports);
    } else {
      this.reports = this.filterReports.filter(
        (data: any) => data.status === this.status
      );
      this.dataSource = new MatTableDataSource(this.reports);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  check(value) {
    return value ? value : "N/A";
  }

  // updateStatus(victimId, id, value) {
  //   var data = {
  //     victimId: victimId,
  //     id: id,
  //     status: value,
  //   };
  //   // console.log(data);
  //   this.incidentReportService.updateIncidentReport(data);
  // }

  openModel(report: object) {
    this.searchService.report.next({ ...report, ...this.authService.userInfo });
  }

  // openCloseModel(report: Object) {
  //   this.searchService.report.next({ ...report, ...this.authService.userInfo });
  // }

  get(key, id) {
    localStorage.setItem("reportKeys", JSON.stringify({ key: key, id: id }));
    this.router.navigate(["user-report"]);
  }
}
