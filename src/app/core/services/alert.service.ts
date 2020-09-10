import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  formErrors = {
    invalidFormTitle: 'Invalid form',
    invalidFormMsg: 'Please recheck form fields',
  };

  loginAuth = {
    success200: 'Welcome to Police Dispatch',
  };

  logout = {
    Title: 'Police Dispatch',
    Msg: 'Thanks for visiting us',
    expireMsg: 'Token expires',
  };

  registeredVictim = {
    title: 'Police Dispatch',
    msg: 'Victim Registered!'
  };

  registerIncident = {
    title: 'Police Dispatch',
    msg: 'Incident Registered!'
  };

  groupChat = {
    title: 'Created!',
    msg: 'You can now group chat',
  };

  chatClosed = {
    success: 'Chat Closed!',
  };

  // =============== Methods
  successAlert(title, text) {
    this.toastr.success(title, text, { timeOut: 2000 });
  }

  errorAlert(title, text) {
    this.toastr.error(title, text, { timeOut: 2000 });
  }

  warningAlert(title, text) {
    this.toastr.warning(title, text, { timeOut: 2000 });
  }
}
