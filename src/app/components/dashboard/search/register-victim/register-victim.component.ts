import { Component, OnInit, OnDestroy } from "@angular/core";
import { RegisterVictimForm } from "src/app/core/forms/dashboard/register-victim-form";
import { FormGroup } from "@angular/forms";
import { SearchService } from "src/app/core/services/search.service";
import { AlertService } from "src/app/core/services/alert.service";
import { TranslatorService } from "src/app/core/services/translator.service";
import { FormaterPipe } from "src/app/core/pipes/formater.pipe";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-register-victim",
  templateUrl: "./register-victim.component.html",
  styleUrls: ["./register-victim.component.css"],
})
export class RegisterVictimComponent implements OnInit {
  fakeFeets = new Array(7);
  fakeInches = new Array(13);
  RegisterVictimForm: FormGroup;
  editVictim;
  constructor(
    private registerUserForm: RegisterVictimForm,
    public searchService: SearchService,
    private alertService: AlertService,
    public translator: TranslatorService,
    private formater: FormaterPipe,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    delete this.fakeFeets[0];
    delete this.fakeInches[0];
    this.RegisterVictimForm = this.registerUserForm.initForm();
    if (this.searchService.editVictimDetail) {
      this.searchService.editVictimDetail.subscribe((res) => {
        if (res) {
          this.RegisterVictimForm.patchValue(res);
        } else {
          this.alertService.errorAlert('Police Dipatch', 'Failed to laod data');
        }
      })
    }
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    // }
  }

  setPosition(position) {
    // let geocoder = new google.maps.Geocoder();
    // let latlng = {
    //   lat: position.coords["latitude"],
    //   lng: position.coords["longitude"],
    // };
    // geocoder.geocode({ location: latlng }, (results) => {
    //   if (results[0]) {
    //     // console.log(results[0].formatted_address);
    //   } else {
    //     // console.log("No results found");
    //   }
    // });
  }

  transform(field) {
    const name = field.ngControl.name;
    const value = field.value;
    if (value.length >= 10) {
      var s = this.formater.transform(value);
      this.RegisterVictimForm.controls[name].setValue(s);
    }
  }

  submit() {
    if (this.RegisterVictimForm.valid) {
      const data = {
        form: this.RegisterVictimForm.value
      }
      this.searchService
        .registerUser(data)
        .subscribe(() => {
          this.alertService.successAlert(
            this.alertService.registeredVictim.title,
            this.alertService.registeredVictim.msg
          );
          this.RegisterVictimForm.reset();
        });
    } else {
      this.alertService.warningAlert(
        this.alertService.formErrors.invalidFormTitle,
        this.alertService.formErrors.invalidFormMsg
      );
    }
  }

  update() {
    if (this.RegisterVictimForm.valid) {
      const data = {
        form: this.RegisterVictimForm.value,
        id: this.searchService.victimDetails.id,
        node: this.searchService.victimDetails.node
      }
      this.searchService.registerUser(data).subscribe((res) => {
        if (res) {
          this.alertService.successAlert(this.alertService.registeredVictim.title,
            this.alertService.registeredVictim.msg);
          this.RegisterVictimForm.reset();
          this.searchService.editVictimDetail.next({});
        } else {
          this.alertService.warningAlert(
            this.alertService.formErrors.invalidFormTitle,
            this.alertService.formErrors.invalidFormMsg
          );
        }
      })
    } else {
      this.alertService.errorAlert('Police Dispatch', 'Enter correct data');
    }
  }

}
