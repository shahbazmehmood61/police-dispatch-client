import { Component, OnInit } from '@angular/core';
import { TranslatorService } from 'src/app/core/services/translator.service';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
})
export class IncidentComponent implements OnInit {
  navLinks = [
    {
      path: 'victim-detail',
      label: 'Victim Detail',
      i18n: 'victim-detail-tab.Victim Detail',
    },
    {
      path: 'report-incident',
      label: 'Report Incident',
      i18n: 'victim-detail-tab.Report Incident',
    },
    {
      path: 'incident-history',
      label: 'Incident History',
      i18n: 'victim-detail-tab.Incident History',
    },
    {
      path: 'chat-history',
      label: 'Chat History',
      i18n: 'victim-detail-tab.Chat History',
    },
  ];
  constructor(public translator: TranslatorService) { }

  ngOnInit() { }
}
