import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent implements OnInit {
  center = { lat: 24, lng: 12 };
  // markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  // display?: google.maps.LatLngLiteral;

  constructor() {}

  ngOnInit() {}

  // addMarker(event: google.maps.MouseEvent) {
  //   this.markerPositions.push(event.latLng.toJSON());
  // }

  // move(event: google.maps.MouseEvent) {
  //   this.display = event.latLng.toJSON();
  // }

  // removeLastMarker() {
  //   this.markerPositions.pop();
  // }
}
