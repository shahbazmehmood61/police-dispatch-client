import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCityForm } from 'src/app/core/forms/dashboard/register-city';
import { FormaterPipe } from 'src/app/core/pipes/formater.pipe';
import { AlertService } from 'src/app/core/services/alert.service';
import { CityService } from 'src/app/core/services/city.service';
import { TranslatorService } from 'src/app/core/services/translator.service';

@Component({
  selector: 'app-register-cities',
  templateUrl: './register-cities.component.html',
  styleUrls: ['./register-cities.component.css']
})
export class RegisterCitiesComponent implements OnInit {
  registerCity: FormGroup;
  cities = [];
  constructor(
    public createCity: CreateCityForm,
    public cityService: CityService,
    public formater: FormaterPipe,
    public alert: AlertService,
    public router: Router,
    public translate: TranslatorService
  ) { }

  ngOnInit() {
    this.registerCity = this.createCity.initForm();
    if (this.cityService.city) {
      this.registerCity.patchValue(this.cityService.city)
    } else {
      this.cityService.city = ''
    }
  }

  submit() {
    // console.log(this.registerCity.value);
    if (this.registerCity.valid) {
      this.cityService.createCity([this.registerCity.value])
        .subscribe((res) => {
          console.log(res)
          this.registerCity.reset();
          this.alert.successAlert('Police Dispatch', 'City added');
          // this.router
        }, (err) => {
          this.alert.successAlert('Police Dispatch', 'Failed to add city');
        })
    } else {
      this.alert.warningAlert('Police Dispatch', 'Please recheck fields');
    }
  }

  update() {
    console.log(this.registerCity.value)
    console.log(this.cityService.city['key'])
    this.cityService.editCity(this.cityService.city['key'], this.registerCity.value)
      .subscribe((res) => {
        this.alert.successAlert('Police Dispatch', 'City updated')
        this.cityService.city = ''
        this.registerCity.reset();
        this.router.navigate(['/admin/cities'])
      })
  }

  formateNumber() {
    const phone = this.registerCity.get('phoneNumber').value
    this.registerCity.controls['phoneNumber'].setValue(this.formater.transform(phone));
  }

  reset() {
    this.registerCity.reset()
  }

}
