import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';

export class RegisterIncidentReportForm {
  officerID;
  userName: string
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public searchService: SearchService,
    public cookieService: CookieService
  ) {
    this.officerID = this.authService.userInfo.uid;
    // this.userName = JSON.parse(this.cookieService.get('userMeta')).userInfo.name
    this.userName = JSON.parse(localStorage.getItem('userMeta')).userInfo.name
  }

  registerIncidentReportForm: FormGroup;

  initForm() {
    return (this.registerIncidentReportForm = this.fb.group({
      telephoneNo: [null, [Validators.maxLength(14), Validators.minLength(14)]],
      officerId: this.officerID,
      victimId: this.searchService.victimID,
      status: "open",
      firstName: [{ value: null, disabled: true }],
      middleInitial: [{ value: null, disabled: true }],
      lastName: [{ value: null, disabled: true }],
      secondLastName: [{ value: null, disabled: true }],

      // Auto get
      dateOfCall: null,
      timeOfCall: null,
      incidentDate: null,
      incidentTime: null,
      locationOfIncident: null,
      levelsOfAggressiveness: null,
      officerReceivingCall: [{ value: this.userName, disabled: true }],
      patrolDispatchTime: null,
      dispatchedPatrol: null,

      // para
      typeOfReport: null,
      peopleInvolved: null,
      necessaryResources: null,
      incidentNarrative: null,
    }));
  }

}
