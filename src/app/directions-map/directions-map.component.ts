import { Component, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { Directive, Input, Output } from '@angular/core';

@Component({
  selector: 'app-directions-map',
  templateUrl: './directions-map.component.html',
  styleUrls: ['./directions-map.component.css'],
  providers: [GoogleMapsAPIWrapper],
})
export class DirectionsMapComponent implements OnInit {
  constructor(
    private gmapsApi: GoogleMapsAPIWrapper
  ) { }

  ngOnInit() {
  }

  @Input() origin: any;
  @Input() destination: any;
  @Input() originPlaceId: any;
  @Input() destinationPlaceId: any;
  @Input() waypoints: any;
  @Input() directionsDisplay: any;
  @Input() estimatedTime: any;
  @Input() estimatedDistance: any;

  updateDirections() {
    this.gmapsApi.getNativeMap().then(map => {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }

      var directionsService = new google.maps.DirectionsService;
      var latLngA = new google.maps.LatLng({ lat: this.origin.latitude, lng: this.origin.longitude });
      var latLngB = new google.maps.LatLng({ lat: this.destination.latitude, lng: this.destination.longitude });
      this.directionsDisplay.setMap(map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 8,
          strokeOpacity: 0.7,
          strokeColor: '#00468c'
        }
      });
      this.directionsDisplay.setDirections({ routes: [] });
      directionsService.route({
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        avoidHighways: true,
        //travelMode: google.maps.DirectionsTravelMode.DRIVING
        //travelMode: 'DRIVING'
      }, function (response: any, status: any) {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          map.setZoom(30);
          console.log(this.getcomputeDistance(latLngA, latLngB));
          var point = response.routes[0].legs[0];
          this.estimatedTime = point.duration.text;
          this.estimatedDistance = point.distance.text;
          console.log(this.estimatedTime);
          console.log('Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')');

        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    });
  }

  private getcomputeDistance(latLngA: any, latLngB: any) {
    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
  }

}
