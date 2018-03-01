import { ElementRef, NgZone, OnInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { GoogleAnalyticsEventsService } from '../../providers/google-analytics-events.service';
import { AnalyticsEvent } from '../../models/AnalyticsEvent';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {
  //global variables needed
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public result: any[];
  public loadFinished: boolean = false;
  private _event: AnalyticsEvent;
  private map: any;
  private placeLoc: any;
  private place: any;
  private markerArray = [];
  private directionsDisplay: any;
  private directionsService: any;

  constructor(
    //inject dependencies
    private _googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    private _app: AppService,
    private mapsAPILoader: MapsAPILoader,//load google places api 

  ) {
    this.latitude = this._app.lat;
    this.longitude = this._app.lng;
  }

  ngOnInit() {
    //set current position
    this.setCurrentPosition();
    // google analytics event
    this._event = new AnalyticsEvent("food", "unknown")
  }

  // gmap from api
  onMapLoad(map) {
    console.log(map);
    this.map = map;
    setTimeout(() => {
      this.draw(map);
    }, 2000);

  }
  // draw map 
  draw(map: any) {
    this.zoom = 15;
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      // set location
      location: { lat: this.latitude, lng: this.longitude },
      radius: 5000,
      // set type of service to restaurants
      types: ['restaurant']
    }, (results, status) => {
      // sort restaurants by rating
      results.sort(function (a: google.maps.places.PlaceResult, b: google.maps.places.PlaceResult) {
        // return them in asc order
        return b.rating - a.rating;
      });
      this.result = results;
      this.loadFinished = true;
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          //coord for restaurants
          this.place = results[i];
          this.placeLoc = this.place.geometry.location;

          var marker = new google.maps.Marker({
            // create marker on the map
            map: map,
            position: this.place.geometry.location,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          });
          var infowindow = new google.maps.InfoWindow({
          });
          var self = this;
          // google analytics event on pin click
          google.maps.event.addListener(marker, 'click', function () {
            self.logEvent("pin-click", this.place.name)
            infowindow.setContent('<div><strong>' + this.place.name + '</strong><br>');
            infowindow.open(map, this);
          });
        }
      }
    });
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    });
    this.directionsService = new google.maps.DirectionsService;
  }

  // set current position
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  // find route between my location and the clicked restaurant
  findRoute(place) {
    console.log('findRouteClicked');
    this.directionsService.route({
      // start
      origin: { lat: this.latitude, lng: this.longitude },
      // finish
      destination: place.geometry.location,
      //choose route to be draw by draw mode
      travelMode: google.maps.TravelMode.DRIVING
    }, (response: any, status: any) => {
      if (status === 'OK') {
        // if ok draw route
        this.map.setZoom(30);
        var myRoute = response.routes[0].legs[0];
        this.directionsDisplay.setDirections(response);
      }
      else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

  // google analytics
  logEvent(type: string, label: string) {
    this._event.eventAction = type;
    this._event.eventLabel = label;
    this._googleAnalyticsEventsService.emitEvent(this._event);
  }

}
