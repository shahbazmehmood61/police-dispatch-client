import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateOfficerForm } from 'src/app/core/forms/dashboard/create-officer-form';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-officer',
  templateUrl: './register-officer.component.html',
  styleUrls: ['./register-officer.component.css']
})
export class RegisterOfficerComponent implements OnInit {
  registerOfficer: FormGroup;
  lat: any;
  lng: any;
  constructor(
    public createRegisterForm: CreateOfficerForm,
    public authService: AuthService,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.registerOfficer = this.createRegisterForm.initForm()
    this.getGeoLocation()
  }

  submit() {
    console.log(this.registerOfficer.value);
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

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          const { latitude, longitude } = position.coords;
          this.lat = latitude;
          this.lng = longitude;
          console.log(this.lat, this.lng)
        }
      })
    }
  }


}
