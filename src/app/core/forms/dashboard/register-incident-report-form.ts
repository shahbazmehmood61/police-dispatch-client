import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';

export class RegisterIncidentReportForm {
  officerID;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public searchService: SearchService
  ) {
    this.officerID = this.authService.userInfo.uid;
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
      officerReceivingCall: null,
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
