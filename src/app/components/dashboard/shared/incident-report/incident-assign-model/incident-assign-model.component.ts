import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-incident-assign-model',
  templateUrl: './incident-assign-model.component.html',
  styleUrls: ['./incident-assign-model.component.css']
})
export class IncidentAssignModelComponent implements OnInit {
  report;
  constructor(
    public searchService: SearchService,
  ) { }

  ngOnInit() {
    this.searchService.report
      .subscribe((rep) => {
        this.report = rep;
      });
  }

  check(value) {
    return value ? value : 'N/A';
  }
}
