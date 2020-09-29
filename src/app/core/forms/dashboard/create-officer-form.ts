import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: "root"
})
export class CreateOfficerForm {
  constructor(public fb: FormBuilder) { }

  createOfficer: FormGroup

  initForm() {
    return this.createOfficer = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      cityCode: [null, Validators.required],
      // city: [null, Validators.required],
      role: [null, Validators.required],
      // lat: [null, Validators.required],
      // lng: [null, Validators.required]
    })
  }
}