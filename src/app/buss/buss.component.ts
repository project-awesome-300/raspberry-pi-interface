//import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { BussService } from './buss.service'; 
import { Http,Response } from '@angular/http'; 
import 'rxjs/add/operator/map';


declare var google: any;
@Component({
  selector: 'app-buss',
  styles: [`
  agm-map {
    height: 300px;
  }
`],
template: `
  <div class="container">
    <h1>Search for Bus sattion</h1>
    <div class="form-group">
      <input placeholder="search for busstop" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl">
    </div>
    <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
      <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
    </agm-map>
  </div>
`
})
export class BussComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps defaults
  


    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
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
}



























  /*
  public lat: number; 
  public lng: number; 
  public zoom: number; 

  constructor(  private mapsAPILoader: MapsAPILoader){
   
  }
  

  
  ngOnInit() {




     //use method mapsAPILoader to load google places api 
     this.mapsAPILoader.load().then(() => { 
    //sligo bus station lat lng
    this.zoom = 4; 
    this.lat =  54.271687; 
    this.lng = -8.482526;
    

      }); 
    


  /*  var mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
var map = new google.maps.Map(document.getElementById("gmap"), mapProp);
   }
                 

}

*/



/*
 
  constructor(private _busService: BussService){
    
   }  
  Data = {};

  getBussTimetbles() {
    this._busService.getData().subscribe(data => this.Data = data);
    console.log(this.Data) 
  }

  ngOnInit() {
    this.getBussTimetbles();
  }
  */

