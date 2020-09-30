import { Component, OnInit } from "@angular/core";
import { TranslatorService } from "src/app/core/services/translator.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  navLinks = [
    {
      path: "register-victim",
      label: "Register Victim",
      i18n: "first-search-tab.Register Victim",
    },
    {
      path: "search-victim",
      label: "Search Victim",
      i18n: "first-search-tab.Search Victim",
    },
    {
      path: "victim-detail",
      label: "Victim Detail",
      i18n: "first-search-tab.Victim Detail",
    },
    {
      path: "incident-history",
      label: "Incident History",
      i18n: "first-search-tab.Incident History",
    },
    {
      path: "chat-history",
      label: "Chat History",
      i18n: "first-search-tab.Chat History",
    },

    {
      path: "officer-registered-incidents",
      label: "Incedents",
      i18n: "search-tab.Incident",
    },
  ];

  constructor(public translator: TranslatorService) {}

  ngOnInit() {}
}
