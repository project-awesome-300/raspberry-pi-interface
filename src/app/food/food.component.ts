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
  // public searchControl: FormControl;
  public zoom: number;
  // public result: google.maps.places.PlaceResult[];
 

  // @ViewChild("search") //viechild decorator get access to the input element
  // public searchElementRef: ElementRef;//decorate the variable to the search input 

  constructor(
    //inject dependencies
    // private mapsAPILoader: MapsAPILoader,//load google places api 
    // private ngZone: NgZone
  ) { }

  ngOnInit() {
    //set google maps initial values
    // this.zoom = 5;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;

    //create FormControl instance for search
    // this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //use method mapsAPILoader to load google places api
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(
    //     this.searchElementRef.nativeElement, {
    //       types: ["address"]
    //     });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //run method store data from gmp including updating
    //       //get the place result
    //       let place: google.maps.places.PlaceResult =
    //         autocomplete.getPlace();

    //       //verify result
    //       if (place.geometry === undefined ||
    //         place.geometry === null) {
    //         return;
    //       }

    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });
  }
  onMapLoad(map) {

    console.log(map);

    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 18;

      console.log({ lat: this.latitude, lng: this.longitude });
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: { lat: this.latitude, lng: this.longitude },
        radius: 5000,
        types: ['restaurant']
      }, function (results, status) { 
        console.log(results);
        // this.result=results;
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            // createMarker(results[i]);
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
              infowindow.setContent(place.name);
              // infowindow.setContent(place.opening_hours);
              infowindow.open(map, this);
            });
          } 
        }
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
