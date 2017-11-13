import { ElementRef, NgZone, OnInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
//import {TravelMode} //from '';



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
  private map:any;

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
    //  this.latitude = 39.8282;
    //this.longitude = -98.5795;

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
          var directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
          var directionsService = new google.maps.DirectionsService;
          directionsService.route({
            origin: { lat: this.latitude, lng: this.longitude },
            destination: place.geometry.location,
            avoidHighways: true,
            travelMode: google.maps.TravelMode.DRIVING
            // travelMode: 'DRIVING'
          }, function (response: any, status: any) {
            if (status === 'OK') {
              //me.directionsDisplay.setDirections(response);
              instance.map.setZoom(30);
              //console.log(me.getcomputeDistance (latLngA, latLngB));
              var point = response.routes[0].legs[0];
              console.log(response);
              //me.estimatedTime = point.duration.text;
              //me.estimatedDistance = point.distance.text;
              //console.log(me.estimatedTime);
              //console.log('Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')');

              var myRoute = response.routes[0].legs[0];
              directionsDisplay.setDirections(response);
              for (var i = 0; i < myRoute.steps.length; i++) {
                var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
                marker.setMap(instance.map);
                marker.setPosition(myRoute.steps[i].start_location);
              //   attachInstructionText(
              //       stepDisplay, marker, myRoute.steps[i].instructions, map);
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
    // else{
    //   alert('There is a problem geting geolocation!');
    // }
  }
  //   // ===============================================================================
  // function SearchRoute() {  
  //   document.getElementById("MyMapLOC").style.display = 'none';  

  //   var markers = new Array();  
  //   var myLatLng;  

  //   //Find the current location of the user.  
  //   if (navigator.geolocation) {  
  //       navigator.geolocation.getCurrentPosition(function(p) {  
  //           var myLatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);  
  //           var m = {};  
  //           m.title = "Your Current Location";  
  //           m.lat = p.coords.latitude;  
  //           m.lng = p.coords.longitude;  
  //           markers.push(m);  

  //           //Find Destination address location.  
  //           var address = document.getElementById("txtDestination").value;  
  //           var geocoder = new google.maps.Geocoder();  
  //           geocoder.geocode({ 'address': address }, function(results, status) {  
  //               if (status == google.maps.GeocoderStatus.OK) {  
  //                   m = {};  
  //                   m.title = address;  
  //                   m.lat = results[0].geometry.location.lat();  
  //                   m.lng = results[0].geometry.location.lng();  
  //                   markers.push(m);  
  //                   var mapOptions = {  
  //                       center: myLatLng,  
  //                       zoom: 4,  
  //                       mapTypeId: google.maps.MapTypeId.ROADMAP  
  //                   };  
  //                   var map = new google.maps.Map(document.getElementById("MapRoute"), mapOptions);  
  //                   var infoWindow = new google.maps.InfoWindow();  
  //                   var lat_lng = new Array();  
  //                   var latlngbounds = new google.maps.LatLngBounds();  

  //                   for (i = 0; i < markers.length; i++) {  
  //                       var data = markers[i];  
  //                       var myLatlng = new google.maps.LatLng(data.lat, data.lng);  
  //                       lat_lng.push(myLatlng);  
  //                       var marker = new google.maps.Marker({  
  //                           position: myLatlng,  
  //                           map: map,  
  //                           title: data.title  
  //                       });  
  //                       latlngbounds.extend(marker.position);  
  //                       (function(marker, data) {  
  //                           google.maps.event.addListener(marker, "click", function(e) {  
  //                               infoWindow.setContent(data.title);  
  //                               infoWindow.open(map, marker);  
  //                           });  
  //                       })(marker, data);  
  //                   }  
  //                   map.setCenter(latlngbounds.getCenter());  
  //                   map.fitBounds(latlngbounds);  

  //                   //***********ROUTING****************//  

  //                   //Initialize the Path Array.  
  //                   var path = new google.maps.MVCArray();  

  //                   //Getting the Direction Service.  
  //                   var service = new google.maps.DirectionsService();  

  //                   //Set the Path Stroke Color.  
  //                   var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });  

  //                   //Loop and Draw Path Route between the Points on MAP.  
  //                   for (var i = 0; i < lat_lng.length; i++) {  
  //                       if ((i + 1) < lat_lng.length) {  
  //                           var src = lat_lng[i];  
  //                           var des = lat_lng[i + 1];  
  //                           path.push(src);  
  //                           poly.setPath(path);  
  //                           service.route({  
  //                               origin: src,  
  //                               destination: des,  
  //                               travelMode: google.maps.DirectionsTravelMode.DRIVING  
  //                           }, function(result, status) {  
  //                               if (status == google.maps.DirectionsStatus.OK) {  
  //                                   for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {  
  //                                       path.push(result.routes[0].overview_path[i]);  
  //                                   }  
  //                               } else {  
  //                                   alert("Invalid location.");  
  //                                   window.location.href = window.location.href;  
  //                               }  
  //                           });  
  //                       }  
  //                   }  
  //               } else {  
  //                   alert("Request failed.")  
  //               }  
  //           });  

  //       });  
  //   }  
  //   else {  
  //       alert('Some Problem in getting Geo Location.');  
  //       return;  
  //   }  
  // }  


  // ===============================================================================


}
