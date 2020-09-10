import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { email } from '../../constants/string-constants';

export class RegisterVictimForm {
  constructor(private fb: FormBuilder) { }

  registerVictim: FormGroup;

  initForm() {
    return this.fb.group({
      firstName: null,
      middleInitial: null,
      lastName: null,
      secondLastName: null,
      cellNumber: [null, [Validators.maxLength(14), Validators.minLength(14)]],
      homeCellNumber: [
        null,
        [Validators.maxLength(14), Validators.minLength(14)],
      ],
      DOB: null,
      gender: null,
      height: this.fb.group({
        feets: null,
        inches: null,
      }),
      eyeColor: null,
      weight: null,
      address: null,
      locationMap: null,
      drivingLicense: null,
      driverLicenseNumber: null,
      email: [null, Validators.pattern(email)],
    });
  }
}
