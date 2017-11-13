import { Component, ElementRef, NgZone,NgModule,
   OnInit, ViewChild, Directive, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { } from 'googlemaps';
import { AgmCoreModule, MapsAPILoader} from '@agm/core';
import { DirectionsMapComponent } from '../directions-map/directions-map.component';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { } from '@types/googlemaps';

declare var google: any;
declare var jQuery: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers : [GoogleMapsAPIWrapper]
})

export class MapComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  //public searchControl: FormControl;
  public zoom: number;
  public destinationInput: FormControl; //create FormControl instance for search
  public destinationOutput: FormControl; //create FormControl instance for search
  public iconurl: string;
  // public mapCustomStyles : any;
  public estimatedTime: any;
  public estimatedDistance: any;

  @ViewChild('pickupInput')///viechild decorator get access to the input element
  public pickupInputElementRef: ElementRef;//decorate the variable to the search input 

  @ViewChild('pickupOutput')
  public pickupOutputElementRef: ElementRef;

  @ViewChild('scrollMe')
  private scrollContainer: ElementRef;

  @ViewChild(DirectionsMapComponent)
  vc: DirectionsMapComponent;

  // @ViewChild("search") //viechild decorator get access to the input element
  // public searchElementRef: ElementRef;

  public origin: any; // its a example aleatory position
  public destination: any; // its a example aleatory position

  constructor(
    private mapsAPILoader: MapsAPILoader,//load google places api 
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef
  ) { }

  onMapLoad(map) {
    console.log(map);
    this.map = map;
  }

  ngOnInit() {
    //set google maps initial values
    this.zoom = 5;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    //this.iconurl='../image/map-icon.url';

    //create FormControl instance for search
    // this.searchControl = new FormControl();
    //create search FormControl
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();

    //set current position
    this.setCurrentPosition();
//console.log(this.pickupInputElementRef);
    //use method mapsAPILoader to load google places api
    this.mapsAPILoader.load().then(() => {
      let autocompleteInput = new google.maps.places.Autocomplete(
        this.pickupInputElementRef.nativeElement, {
          types: ["address"]
        });
      let autocompleteOutput = new google.maps.places.Autocomplete(
        this.pickupOutputElementRef.nativeElement, {
        types: ["address"]
      });
      this.setupPlaceChangedListener(autocompleteInput, 'ORG');
      this.setupPlaceChangedListener(autocompleteOutput, 'DES');
    });
  }
  private setupPlaceChangedListener(autocomplete: any, mode: any) {
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
        if (mode === 'ORG') {
          this.vc.origin = { longitude: place.geometry.location.lng(), 
                            latitude: place.geometry.location.lat() };
          this.vc.originPlaceId = place.place_id;
        } else {
          this.vc.destination = { longitude: place.geometry.location.lng(), 
                                  latitude: place.geometry.location.lat() }; // its a example aleatory position
          this.vc.destinationPlaceId = place.place_id;
        }
        if (this.vc.directionsDisplay === undefined) {
          this.mapsAPILoader.load().then(() => {
            this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
          });
        }
        //Update the directions
        this.vc.updateDirections();
        this.zoom = 12;
      });
    });
  }
  getDistanceAndDuration() {
    this.estimatedTime = this.vc.estimatedTime;
    this.estimatedDistance = this.vc.estimatedDistance;
  }

  // scrollToBottom(): void {
  //   jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
  // }

  private setPickUpLocation(place: any) {
    //verify result
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    //set latitude, longitude and zoom
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.zoom = 12;
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
  // private getMapCusotmStyles() {
  //   // Write your Google Map Custom Style Code Here.
  // }

}
