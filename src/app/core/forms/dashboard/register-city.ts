import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: "root"
})
export class CreateCityForm {
  constructor(public fb: FormBuilder) { }

  createCity: FormGroup

  initForm() {
    return this.createCity = this.fb.group({
      cityName: [null, Validators.required],
      cityCode: [null, Validators.required],
      phoneNumber: [null, Validators.required]
    })
  }
}