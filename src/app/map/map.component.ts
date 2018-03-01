import { ElementRef, NgZone, OnInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  // global variables needed
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  private map: any;

  @ViewChild("search") //viechild decorator get access to the input element
  public searchElementRef: ElementRef;//decorate the variable to the search input 

  constructor(
    //inject dependencies
    private mapsAPILoader: MapsAPILoader,//load google places api 
    private ngZone: NgZone,
    private _app: AppService
  ) { }

  // from gmaps api
  onMapLoad(map) {
    this.map = map;
  }

  ngOnInit() {
    //set google maps initial values
    //create FormControl instance for search
    this.searchControl = new FormControl();
    //set current position
    this.zoom = 12;
    this.latitude = this._app.lat;
    this.longitude = this._app.lng;

    //use method mapsAPILoader to load google places api
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement, {
          //restrict google maps to ir for a better searching
          componentRestrictions: { country: "ie", }
        });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //run method store data from gmp including updating
          //get the place result
          let place: google.maps.places.PlaceResult =
            autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // local variables
          var instance = this;
          var markerArray = [];
          var directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.map
          });
          var directionsService = new google.maps.DirectionsService;
          //rcreate route 
          directionsService.route({
            //start 
            origin: { lat: this.latitude, lng: this.longitude },
            //finish 
            destination: place.geometry.location,
            avoidHighways: true,
            //choose route to be draw by draw mode
            travelMode: google.maps.TravelMode.DRIVING
          }, function (response: any, status: any) {
            if (status === 'OK') {
              instance.map.setZoom(30);
              var point = response.routes[0].legs[0];
              var myRoute = response.routes[0].legs[0];
              directionsDisplay.setDirections(response);
              for (var i = 0; i < myRoute.steps.length; i++) {
                //if there is no marker on the map, create one
                var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
                marker.setPosition(myRoute.steps[i].start_location);
              }

            } else {
              //show msg if status not ok
              console.log('Directions request failed due to ' + status);
            }
          });
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
}
