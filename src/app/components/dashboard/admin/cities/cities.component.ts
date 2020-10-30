import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CityService } from 'src/app/core/services/city.service';
import { TranslatorService } from 'src/app/core/services/translator.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = [
    "cityName",
    "cityCode",
    "phoneNumber",
    "actions"
  ]
  constructor(
    public cityService: CityService,
    public translate: TranslatorService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cityService.cities().subscribe((res: any) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editCity(city: Object) {
    console.log(city)
    this.cityService.city = city;
    this.router.navigate(['/admin/register-city']);
  }

  deleteCity(id: any) {
    console.log(id)
    this.cityService.deleteCity(id).subscribe((res) => {
      console.log('delete', res)
    })
  }

}
