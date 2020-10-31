import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  navLinks = [
    {
      path: "register-city",
      label: "Register City",
      i18n: "Register City",
    },
    {
      path: "cities",
      label: "Cities",
      i18n: "Cities",
    },
    {
      path: "bulk-cities",
      label: "Bulk Cities",
      i18n: "Bulk Cities",
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
