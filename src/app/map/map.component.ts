import { ElementRef, NgZone, OnInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
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
    private ngZone: NgZone
  ) { }

  onMapLoad(map) {
    console.log(map);
    this.map = map;
  }

  ngOnInit() {
    //set google maps initial values
    this.zoom = 5;

    //create FormControl instance for search
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //use method mapsAPILoader to load google places api
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement, {
          types: ["address"]
        });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //run method store data from gmp including updating
          //get the place result
          let place: google.maps.places.PlaceResult =
            autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined ||
            place.geometry === null) {
            return;
          }

          var instance = this;
          var markerArray = [];
          var directionsDisplay = new google.maps.DirectionsRenderer({ map: this.map });
          var directionsService = new google.maps.DirectionsService;
          directionsService.route({
            origin: { lat: this.latitude, lng: this.longitude },
            destination: place.geometry.location,
            avoidHighways: true,
            travelMode: google.maps.TravelMode.DRIVING
          }, function (response: any, status: any) {
            if (status === 'OK') {
              instance.map.setZoom(30);
              var point = response.routes[0].legs[0];
              console.log(response);

              var myRoute = response.routes[0].legs[0];
              directionsDisplay.setDirections(response);
              for (var i = 0; i < myRoute.steps.length; i++) {
                var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
                marker.setPosition(myRoute.steps[i].start_location);
              }

            } else {
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

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
    else {
      alert('There is a problem geting geolocation!');
    }
  }

}
