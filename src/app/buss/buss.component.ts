
import { Component, NgZone, OnInit} from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { BussService } from './buss.service'; 
import { Http,Response } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { Location } from '../../models/location';

//declare const google; 
//declare let google: any;

var directionsDisplay;
//var directionsService = new google.maps.DirectionsService();
var map;

@Component({
  selector: 'app-buss',
  templateUrl: './buss.component.html', 
  styleUrls: ['./buss.component.css'] 
}) 

export class BussComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;

 

 latitude1: number=54.274188;
 longitude1: number= -8.480622;
  
 //map: any;
 //infoWindow = new google.maps.InfoWindow();

  /* from model
  latLngLocation: Location[]=[
    new Location(54.271687,-8.482526,'Bus Station')
  ];
*/

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ){}



  ngOnInit() {
  this.setCurrentPosition();
  

   /* //direction service
        directionsDisplay = new google.maps.DirectionsRenderer();
        var inticor= new google.maps.LatLng(54.2666, -8.4787);
        var mapOptions =
                {
                    zoom: 9,
                    center: inticor,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                };

        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
        directionsDisplay.setMap(map);      
        this.calcRoute(); */

       // this.calculateAndDisplayRoute();

    }; 

    
    private setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
        var curLat=  this.latitude = position.coords.latitude;
       var curLong=   this.longitude = position.coords.longitude;
          console.log("current location", curLat, curLong); 
       //   infoWindow.setContent('Current Location');
          this.zoom = 13;
          var CurrentLoc ={curLat, curLong};
        });
      }
    } 




     //set google maps defaults
     /*
     this.zoom = 4;
     this.latitude1 = 54.271687;
     this.longitude1 = -8.482526;
     this.name= "Bus Station";
 */
    //set new location
   //this.LatLng(54.271687, -8.482526,"Sligo Bus Staion ", "dsfsdf");

// this.NewPosition();

    
/*
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -25.363, lng: 131.044 },
      scrollwheel: true,
      zoom: 16
    });
*/
    //set current position
  // this.createMarker(54.222, 5476, 546575);


   /* was working on that 

 private calculateAndDisplayRoute() {
    var myLocation;
let directionsDisplay = new google.maps.DirectionsRenderer;
   let directionsService = new google.maps.DirectionsService;
   const map = new google.maps.Map(document.getElementById('map'), {
     zoom: 14,
     center: {lat: 54.2666, lng: -8.4787}
   });

if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       var pos = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };
 myLocation=new google.maps.LatLng(pos);

directionsDisplay.setMap(map);
   directionsService.route({
    origin: myLocation,
     destination: {lat: 54.2720255, lng: -8.4840824},  // Bus station    
     travelMode: 'Driving'
   }, function(response, status) {
     if (status == 'OK') {
       directionsDisplay.setDirections(response);
     } else {
       window.alert('Directions request failed due to ' + status);
     }
   });
 }
};
}
*/


/*
  private calcRoute() {
    var start =  new google.maps.LatLng(54.2666, -8.4787); //summerhill
    var end =    new google.maps.LatLng(54.2720255, -8.4840824); //bus stop
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  } */
/*
  public createMarker(latLng, label, url) {
    return new google.maps.Marker({
        position: latLng,
       // map: map,
        icon: url,
        title: label
    });
  }
*/





/*
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  infoWindow.setPosition(pos);
  infoWindow.setContent('Location found.');
  infoWindow.open(map);
  map.setCenter(pos);
}, function() {
  handleLocationError(true, infoWindow, map.getCenter());
});
} else {
// Browser doesn't support Geolocation
handleLocationError(false, infoWindow, map.getCenter());
}
*/

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



/* old API
 
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

