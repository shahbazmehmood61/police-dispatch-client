import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { CityService } from 'src/app/core/services/city.service';
import { TranslatorService } from 'src/app/core/services/translator.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulk-city',
  templateUrl: './bulk-city.component.html',
  styleUrls: ['./bulk-city.component.css']
})
export class BulkCityComponent implements OnInit {
  @ViewChild('file', { static: false }) file: ElementRef<any>
  dataSource;
  displayedColumns = [
    "cityName",
    "cityCode",
    "phoneNumber",
  ];
  cities = [];
  downloadTemplate: string;

  constructor(
    public cityService: CityService,
    public alert: AlertService,
    public translate: TranslatorService
  ) { }

  ngOnInit() {
    this.downloadTemplate = environment.downloadTemplate;
  }

  uploadExcel(e) {
    this.cities = [];
    // console.log(e.target.files);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      // const data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      const data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      const length = data.length;

      for (let i = 1; i < length; i++) {
        const d = {
          cityName: data[i][0],
          cityCode: data[i][1],
          phoneNumber: data[i][2]
        }
        this.cities.push(d)
      }
      console.log(this.cities)
      this.dataSource = new MatTableDataSource(this.cities)
    };
    reader.readAsBinaryString(e.target.files[0]);

  }

  excelSubmit() {
    if (this.cities.length > 0) {
      this.cityService.createCity(this.cities)
        .subscribe((res) => {
          console.log(res)
          this.cities = []
          this.file.nativeElement.value = ""
          this.alert.successAlert('Police Dispatch', 'File Upload')
        })
    } else {
      this.alert.warningAlert('Police Dispatch', 'Please select file')
    }
  }
}
