import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslatorService } from 'src/app/core/services/translator.service';

@Component({
  selector: 'app-officer-list',
  templateUrl: './officer-list.component.html',
  styleUrls: ['./officer-list.component.css']
})
export class OfficerListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = [
    "name",
    "cityName",
    "cityCode",
    "email",
    "password",
    "phoneNumber",
    "role",
    "lat",
    "lng",
    "actions"
  ]
  constructor(public authService: AuthService, public translate: TranslatorService) { }

  ngOnInit() {
    this.authService.getOfficers().subscribe((res: any) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
