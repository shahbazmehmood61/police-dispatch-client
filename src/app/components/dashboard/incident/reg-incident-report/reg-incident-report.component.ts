import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { RegisterIncidentReportForm } from 'src/app/core/forms/dashboard/register-incident-report-form';
import { FormGroup } from '@angular/forms';
import { IncidentReportService } from 'src/app/core/services/incident-report.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { DatePipe } from '@angular/common';
import { FormaterPipe } from 'src/app/core/pipes/formater.pipe';
import { SosService } from 'src/app/core/services/sos.service';
import { reportTypes } from '../../../../core/constants/report-types'


@Component({
  selector: 'app-reg-incident-report',
  templateUrl: './reg-incident-report.component.html',
  styleUrls: ['./reg-incident-report.component.css'],
  providers: [DatePipe],
})
export class RegIncidentReportComponent implements OnInit {
  incidentReportForm: FormGroup;
  reportType;

  constructor(
    public alertService: AlertService,
    public searchService: SearchService,
    public incidentReportService: IncidentReportService,
    public registerIncidentReportForm: RegisterIncidentReportForm,
    private datePipe: DatePipe,
    private formater: FormaterPipe,
    public sosService: SosService
  ) {
    this.reportType = reportTypes;
  }

  ngOnInit() {
    this.incidentReportForm = this.registerIncidentReportForm.initForm();
    this.datetime();
  }

  transform(field) {
    const name = field.ngControl.name;
    const value = field.value;
    if (value.length >= 10) {
      const s = this.formater.transform(value);
      this.incidentReportForm.controls[name].setValue(s);
    }
  }

  register() {
    // console.log(this.searchService.victimID, this.searchService.sosCallId)
    this.incidentReportService
      .registerIncident(
        this.incidentReportForm.getRawValue(),
        this.searchService.victimID,
        this.searchService.sosCallId
      ).subscribe((res) => {
        this.resetForm();
        // console.log(res);
        // if (res != null) {
        // this.sosService.sosCall.next(res)
        // }
        this.alertService.successAlert(
          this.alertService.registerIncident.title,
          this.alertService.registerIncident.msg
        );
        this.incidentReportService.getIncidentDetails(
          this.searchService.victimID
        );
      });
  }

  datetime() {
    this.incidentReportForm.patchValue({
      dateOfCall: [this.datePipe.transform(new Date())],
      timeOfCall: [this.datePipe.transform(new Date(), 'shortTime')],
      middleInitial: this.searchService.victimDetails.middleInitial,
      firstName: this.searchService.victimDetails.firstName,
      lastName: this.searchService.victimDetails.lastName,
      secondLastName: this.searchService.victimDetails.secondLastName,
    });
  }

  resetForm() {
    this.incidentReportForm.reset();
    this.datetime();
  }

  selectType(event) {
    // console.log(event.value)
  }
}
