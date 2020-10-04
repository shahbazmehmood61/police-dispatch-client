import { Component, OnInit, Input } from "@angular/core";
import { DarkmodeService } from "src/app/core/services/darkmode.service";
import { IncidentReportCloseForm } from "src/app/core/forms/dashboard/incident-report-close-form";
import { FormGroup } from "@angular/forms";
import { TranslatorService } from "src/app/core/services/translator.service";
import { SearchService } from "src/app/core/services/search.service";
import { IncidentReportService } from "src/app/core/services/incident-report.service";
import { FormaterPipe } from "src/app/core/pipes/formater.pipe";
import { MatStepper } from '@angular/material/stepper'
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: "app-incident-close-model",
  templateUrl: "./incident-close-model.component.html",
  styleUrls: ["./incident-close-model.component.css"],
})
export class IncidentCloseModelComponent implements OnInit {
  report;
  closeReportForm: FormGroup;
  isLinear = true;
  constructor(
    public darkmode: DarkmodeService,
    public incidentReportClose: IncidentReportCloseForm,
    public translator: TranslatorService,
    public searchService: SearchService,
    public incidentReportService: IncidentReportService,
    public formater: FormaterPipe,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.closeReportForm = this.incidentReportClose.initForm();
    this.searchService.report.subscribe((report) => {
      this.report = report;
      this.setValues();
    });
  }

  addGroup(page, stepper: MatStepper) {
    this.closeReportForm.addControl(page, new FormGroup(this.incidentReportClose[page]));
    setTimeout(() => {
      stepper.next();
    }, 500)
  }

  removeGroup(group, stepper: MatStepper) {
    stepper.previous();
    setTimeout(() => {
      this.closeReportForm.removeControl(group);
    }, 500)
  }

  check(value) {
    return value ? value : "N/A";
  }

  setValues() {
    this.closeReportForm.get('firstPage').patchValue(this.report);
  }

  transform(field) {
    // const name = field.ngControl.name;
    // const value = field.value;
    // if (value.length >= 10) {
    //   var s = this.formater.transform(value);
    //   this.closeReportForm.controls[name].setValue(s);
    // }
  }

  updateStatus(form, id, key, Status) {
    // this.closeReportForm = this.incidentReportClose.initForm();

    const formValues = form.getRawValue();
    const data = {
      victimId: id ? id : this.searchService.victimID,
      id: key ? key : this.report.id,
      status: Status,
      data: formValues,
    };
    this.incidentReportService.updateIncidentReport(data).subscribe((res: any) => {
      if (res) {
        this.alert.successAlert("Police Dispatch", res.msg);
        this.closeReportForm = this.incidentReportClose.initForm();
        this.closeReportForm.reset();
      }
    });
    // this.closeReportForm.removeControl('secondPage');
    // this.closeReportForm.removeControl('thirdPage');
    // setTimeout(() => {
    // this.closeReportForm.reset();


    // this.closeReportForm.get('thirdPage').reset();
    // this.closeReportForm.get('secondPage').reset();

    // }, 1000)
  }
}
