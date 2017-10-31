export class Location {
    Latitude: Number;
    Longitude: Number;
    Name: string;
  //  Details: string;

    constructor(lat: number, lng: number, name: string/*,details:string*/) {
        this.Latitude = lat;
        this.Longitude = lng;
        this.Name = name;
        //this.Details = details;
    }
}


