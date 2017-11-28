import { ElementRef, NgZone, OnInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { GoogleAnalyticsEventsService } from '../../providers/google-analytics-events.service';
import { AnalyticsEvent } from '../../models/AnalyticsEvent';
import { AgmMap } from '@agm/core/directives/map';

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
  public loadFinished = false;
  nothing = '';
  private _event: AnalyticsEvent;
  public height = 0;
  private width = 0;

  @ViewChild('mapbox') mapBox: ElementRef;
  

  constructor(private _googleAnalyticsEventsService: GoogleAnalyticsEventsService) {
   
   }

  ngOnInit() {
    //set current position
    this.setCurrentPosition();
    this._event = new AnalyticsEvent("food", "unknown")

    this.height = (window.screen.availHeight) - 75;
    this.width = this.mapBox.nativeElement.offsetWidth;
    // 
  }

  onMapLoad(map) {
    setTimeout(() => {
      this.draw(map);
    }, 2000);

  }

  draw(map: any) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 14;

      console.log({ lat: this.latitude, lng: this.longitude });
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: { lat: this.latitude, lng: this.longitude },
        radius: 5000,
        types: ['restaurant']
      }, (results, status) => {
        results.sort(function (a: google.maps.places.PlaceResult, b: google.maps.places.PlaceResult) {
            return b.rating - a.rating;
        });
        this.result = results;
        this.loadFinished = true;
        console.log(this.result);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            const place = results[i];
            var placeLoc = place.geometry.location;

            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location,
              animation: google.maps.Animation.DROP,
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });
            var infowindow = new google.maps.InfoWindow({
            });
            var self = this;
            google.maps.event.addListener(marker, 'click', function () {
              self.logEvent("pin-click", place.name)
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>');
              infowindow.open(map, this);
            });
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

  logEvent(type: string, label: string) {
    this._event.eventAction = type;
    this._event.eventLabel = label;
    this._googleAnalyticsEventsService.emitEvent(this._event);
  }
}
