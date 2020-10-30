import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateOfficerForm } from 'src/app/core/forms/dashboard/create-officer-form';
import { City } from 'src/app/core/models/city.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CityService } from 'src/app/core/services/city.service';

@Component({
  selector: 'app-register-officer',
  templateUrl: './register-officer.component.html',
  styleUrls: ['./register-officer.component.css']
})
export class RegisterOfficerComponent implements OnInit {
  registerOfficer: FormGroup;
  lat: any;
  lng: any;
  cities: City[];
  constructor(
    public createRegisterForm: CreateOfficerForm,
    public authService: AuthService,
    public alert: AlertService,
    public cityService: CityService
  ) { }

  ngOnInit() {
    this.registerOfficer = this.createRegisterForm.initForm();
    this.getGeoLocation();
    this.cityService.cities().subscribe((res: any) => {
      console.log(res)
      this.cities = res
    })
  }

  submit() {
    // console.log(this.registerOfficer.value)
    if (this.registerOfficer.valid) {
      const form = {
        ...this.registerOfficer.value,
        lat: this.lat,
        lng: this.lng
      }
      this.authService.createOfficer(form).subscribe((res) => {
        if (res) {
          this.registerOfficer.reset();
          this.alert.successAlert("Police Dispatch", "Officer Registered");
        }
      })
    }
  }

  cityChange(e: any) {
    // console.log(e.value)
    const value: City = e.value;
    this.registerOfficer.controls['phoneNumber'].setValue(value.phoneNumber);
    this.registerOfficer.controls['cityName'].setValue(value.cityName);
    this.registerOfficer.controls['cityCode'].setValue(value.cityCode);
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          const { latitude, longitude } = position.coords;
          this.lat = latitude;
          this.lng = longitude;
        }
      })
    }
  }


}
