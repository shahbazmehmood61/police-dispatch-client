import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  navLinks = [
    {
      path: "register-officer",
      label: "Register Officer",
      i18n: "first-search-tab.Register Victim",
    },
    {
      path: "register-city",
      label: "Register City",
      i18n: "first-search-tab.Register Victim",
    },
    {
      path: "cities",
      label: "Cities",
      i18n: "first-search-tab.Register Victim",
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
