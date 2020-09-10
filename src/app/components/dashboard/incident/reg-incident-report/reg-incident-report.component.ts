import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { RegisterIncidentReportForm } from 'src/app/core/forms/dashboard/register-incident-report-form';
import { FormGroup } from '@angular/forms';
import { IncidentReportService } from 'src/app/core/services/incident-report.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { DatePipe } from '@angular/common';
import { FormaterPipe } from 'src/app/core/pipes/formater.pipe';

const reportTypes = [
  { typeValue: "robbery", type: "Robbery" },
  { typeValue: "aggression", type: "Aggression" },
  { typeValue: "medicalEmergency", type: "Medical emergency" },
  { typeValue: "vehicleRobbery", type: "Vehicle Robbery" },
  { typeValue: "scaling", type: "Scaling" },
  { typeValue: "rape", type: "Rape" },
  { typeValue: "domesticViolence", type: "Domestic violence / Law 54" },
  { typeValue: "murderHomicide", type: "Murder / Homicide" },
  { typeValue: "vandalismo", type: "Vandalismo" },
  { typeValue: "law22", type: "Law 22" },
  { typeValue: "alarmActivated", type: "Alarm activated" },
  { typeValue: "controlledSubstances", type: "Controlled substances" },
  { typeValue: "surveillanceRequest", type: "Surveillance request in an area" },
  { typeValue: "suspiciousPerson", type: "Suspicious person or vehicle" },
  { typeValue: "noise", type: "Noise" },
  { typeValue: "other", type: "Other" }
];

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
    private formater: FormaterPipe
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
    this.incidentReportService
      .registerIncident(
        this.incidentReportForm.getRawValue(),
        this.searchService.victimID,
        this.searchService.sosCallId
      ).subscribe(() => {
        this.resetForm();
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
