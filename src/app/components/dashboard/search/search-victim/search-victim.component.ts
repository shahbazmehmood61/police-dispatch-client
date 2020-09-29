import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { MatTableDataSource } from '@angular/material/table';
import { IVictims } from 'src/app/core/models/victims.model';
import { TranslatorService } from 'src/app/core/services/translator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-victim',
  templateUrl: './search-victim.component.html',
  styleUrls: ['./search-victim.component.css'],
})
export class SearchVictimComponent implements OnInit {
  victims: Array<IVictims> = [];
  displayedColumns: string[] = [
    'view',
    'firstName',
    'middleInitial',
    'lastName',
    'secondLastName',
    'cellNumber',
    'homeCellNumber',
    'DOB',
    'gender',
    'height',
    'eyeColor',
    'weight',
    'address',
    // 'locationMap',
    // 'drivingLicense',
    'driverLicenseNumber',
    'email',
  ];
  dataSource = new MatTableDataSource();

  constructor(
    public searchService: SearchService,
    public translator: TranslatorService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getRegisteredUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRegisteredUser() {
    this.searchService.getRegisteredUser().subscribe((resp: Array<any>) => {
      // resp.reverse();
      this.dataSource = new MatTableDataSource(resp);
    });
  }

  checkData(dataString: string): string {
    if (dataString) {
      return dataString;
    } else {
      return '--';
    }
  }

  viewVictimDetail(id, node) {
    this.searchService.viewVictimDetail = { id, node };
    this.router.navigate(['/search/victim-detail']);
  }
}
