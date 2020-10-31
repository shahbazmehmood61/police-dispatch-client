import { Component, OnInit } from '@angular/core';
import { TranslatorService } from 'src/app/core/services/translator.service';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OfficersComponent implements OnInit {
  navLinks = [
    {
      path: "register-officer",
      label: "Register Officer",
      i18n: "Register Officer",
    },
    {
      path: "officers-list",
      label: "Officer List",
      i18n: "Officers List"
    }
  ]
  constructor(public translate: TranslatorService) { }

  ngOnInit() {
  }

}
