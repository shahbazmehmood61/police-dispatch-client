import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export class SigninForm {
  constructor(
    private fb: FormBuilder
  ) { }

  signinForm: FormGroup;

  initForm() {
    return this.signinForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      platform: 'web',
    });
  }
}
