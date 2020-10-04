import { Component, OnInit } from "@angular/core";
import { IncidentReportService } from "src/app/core/services/incident-report.service";
import { SearchService } from "src/app/core/services/search.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { reportTypes } from '../../../../core/constants/report-types';
import * as _underscore from 'underscore';

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
          // report.reverse()
          this.reports = _underscore.sortBy(report, 'incidentDate').reverse();
          this.filterReports = _underscore.sortBy(report, 'incidentDate').reverse()
          this.dataSource = new MatTableDataSource(this.reports);
          this.statusFilter("all");
          this.incidentTypeFilter('none');
        })
        .catch(() => {
          this.reports = undefined;
        });
    }
  }

  statusFilter(value: any) {
    this.status = value;
    if (this.selectReportType != 'none' && this.selectReportType != undefined && this.status !== "all") {
      this.reports = this.filterReports.filter(
        (data: any) => data.status === value && data.typeOfReport === this.selectReportType
      );
      this.dataSource = new MatTableDataSource(this.reports);
    } else if (this.status !== 'all' && this.selectReportType === "none") {
      this.reports = this.filterReports.filter(
        (data: any) => data.status === value
      );
      this.dataSource = new MatTableDataSource(this.reports)
    } else if (this.status == 'all' && this.selectReportType !== "none") {
      this.reports = this.filterReports.filter(
        (data: any) => data.typeOfReport === this.selectReportType
      );
      this.dataSource = new MatTableDataSource(this.reports)
      // this.dataSource = new MatTableDataSource(this.filterReports)
    } else {
      // this.reports = this.filterReports.filter(
      //   (data: any) => data.status === value
      // );
      this.dataSource = new MatTableDataSource(this.filterReports);
    }
  }

  incidentTypeFilter(value) {
    this.selectReportType = value;
    if (this.selectReportType != "none" && this.selectReportType != undefined && this.status !== 'all') {
      this.reports = this.filterReports.filter(
        (data: any) => data.typeOfReport === this.selectReportType && data.status === this.status
      );
      this.dataSource = new MatTableDataSource(this.reports);
    } else if (this.status === 'all' && this.selectReportType !== "none") {
      this.reports = this.filterReports.filter(
        (data: any) => data.typeOfReport === this.selectReportType
      );
      this.dataSource = new MatTableDataSource(this.reports);
    } else if (this.status !== 'all' && this.selectReportType == "none") {
      this.reports = this.filterReports.filter(
        (data: any) => data.status === this.status
      );
      this.dataSource = new MatTableDataSource(this.reports);
    } else {
      // this.reports = this.filterReports.filter(
      //   (data: any) => data.status === this.status
      // );
      this.dataSource = new MatTableDataSource(this.filterReports);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  check(value) {
    if (value && value.type) {
      return value.type
    } else if (value && !value.type) {
      return value
    } else {
      return 'N/A'
    }
  }

  // updateStatus(victimId, id, value) {
  //   var data = {
  //     victimId: victimId,
  //     id: id,
  //     status: value,
  //   };
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
