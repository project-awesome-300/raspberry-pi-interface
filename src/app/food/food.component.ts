import { ElementRef, NgZone, OnInit, Component,ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search") //viechild decorator get access to the input element
  public searchElementRef: ElementRef; //decorate the variable to the search input 

  constructor(
    //inject dependencies
    
    private mapsAPILoader: MapsAPILoader,//load google places api 
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps initial values
    this.zoom = 5;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

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
  }

// try google restaurrants
//java script file //
var map;
var infowindow;

function initMap() {
  var pyrmont = {lat: -33.867, lng: 151.195};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    types: ['store']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

//java script file //

