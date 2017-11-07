import { ElementRef, NgZone, OnInit, Component, ViewChild } from '@angular/core';
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
  public zoom: number;
  public result: any[];
  public loadFinished= false;
  nothing = '';

  constructor() {}

  ngOnInit() {
    //set current position
    this.setCurrentPosition(); 
  }

  onMapLoad(map) {
    console.log(map);
    
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 15;

      console.log({ lat: this.latitude, lng: this.longitude });
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: { lat: this.latitude, lng: this.longitude },
        radius: 5000,
        types: ['restaurant']
      },  (results, status) => { 
       // console.log(results);
         this.result=results;
         this.loadFinished= true;
         console.log(this.result);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            const place = results[i];
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location,
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });
            var infowindow = new google.maps.InfoWindow({
            });
            google.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent(place.name + 
                "  " + place.photos["0"].html_attributions 
                + " " + place.opening_hours["0"]
              +' '+ place.rating
            +place.formatted_address);
             // infowindow.setValues(place.opening_hours);
               infowindow.open(map, this);
            });
            //google.maps.places.PlaceResult
          } 
        }
        });
    });
  }

  public onClickMe() {
    this.nothing = 'You are my hero!';
    console.log('You are my hero! ----> ');

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