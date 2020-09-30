import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { TranslatorService } from 'src/app/core/services/translator.service';
// import { MapInfoWindow } from '@angular/google-maps';
import { Router } from '@angular/router';
import { RegisterVictimForm } from 'src/app/core/forms/dashboard/register-victim-form';

@Component({
  selector: 'app-victim-detail',
  templateUrl: './victim-detail.component.html',
  styleUrls: ['./victim-detail.component.css'],
})
export class VictimDetailComponent implements OnInit {
  // @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  // center;
  // markerPositions = [];
  victimDetail;
  positions = [];
  centerLng;
  centerLat;
  zoom;
  showMap;
  constructor(
    public searchService: SearchService,
    public translator: TranslatorService,
    public registerForm: RegisterVictimForm,
    public router: Router
  ) { }

  ngOnInit() {
    // console.log(this.searchService.viewVictimDetail);
    if (this.searchService.viewVictimDetail) {
      this.searchService.getSingleVictim(this.searchService.viewVictimDetail).subscribe((res) => {
        console.log({ ...res, ...this.searchService.viewVictimDetail })
        this.searchService.victimDetails = { ...res, ...this.searchService.viewVictimDetail };
        this.mapLatLng();
      })
    } else {
      this.mapLatLng();
    }
  }

  getAge(dateOfBirth): string {
    const date = new Date();
    const dob = new Date(dateOfBirth);
    let age = date.getFullYear() - dob.getFullYear();
    const m = date.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && date.getDate() < dob.getDate())) {
      age--;
    }
    if (!age) {
      return '--';
    }
    return age.toString();
  }

  checkFields(value) {
    return value ? value : 'N/A';
  }

  editUserDetails(data) {
    // this.searchService.victimDetails = data;
    this.searchService.editVictimDetail.next(data);
    this.router.navigate(['/search/register-victim']);
  }

  mapLatLng() {
    if (!this.searchService.singleVictim && this.searchService.callDetail) {
      this.searchService.callDetail.subscribe((callDetail: any) => {
        this.positions.splice(0, this.positions.length);
        if (callDetail.lat && callDetail.lng) {
          this.zoom = 4;
          this.centerLat = +callDetail.lng;
          this.centerLng = +callDetail.lat;
          this.positions.push(
            {
              lat: +callDetail.lat,
              lng: +callDetail.lng,
              icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              radius: 20000,
              color: "red",
            }
          );
        }
        if (this.searchService.victimDetails) {
          this.positions.push({
            lat: +this.searchService.victimDetails.latitude,
            lng: +this.searchService.victimDetails.longitude,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            radius: 0,
            color: "green",
          })
        }
      });
    } else {
      if (this.searchService.victimDetails.latitude && this.searchService.victimDetails.longitude) {
        this.searchService.callDetail.next({});
        this.zoom = 2;
        this.centerLat = +this.searchService.victimDetails.latitude;
        this.centerLng = +this.searchService.victimDetails.longitude;
        this.positions.splice(0, this.positions.length);
        this.positions.push({
          lat: +this.searchService.victimDetails.latitude,
          lng: +this.searchService.victimDetails.longitude,
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          radius: 0,
          color: "green",
        },
          {
            lat: +this.searchService.victimDetails.latitude + 3,
            lng: +this.searchService.victimDetails.longitude + 3,
            icon: "http://maps.google.com/mapfiles/ms/icons/grey-dot.png",
            radius: 0,
            color: "green",
          }
        )
      } else {
        this.searchService.callDetail.next({});
        this.zoom = 4;
        this.centerLat = 37.0902;
        this.centerLng = 95.7129;
        this.positions.splice(0, this.positions.length);
        this.positions.push({
          lat: this.centerLat,
          lng: this.centerLng,
          icon: "http://maps.google.com/mapfiles/ms/icons/grey-dot.png",
          radius: 0,
        }, {
          lat: this.centerLat + 3,
          lng: this.centerLng + 3,
          icon: "http://maps.google.com/mapfiles/ms/icons/grey-dot.png",
          radius: 0,
        })
      }
    }
  }

  // mapClick(event: google.maps.MouseEvent) {
  //   // console.log(event);
  // }
}
