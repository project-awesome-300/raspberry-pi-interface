export class Buss {
    Origin: string;
    Destination: string;
    DepartureTime:string;
    ArrivalTime: string;
    Route: string;

    constructor(origin: string, destination: string, departureTime:string,arrivalTime: string,route:string) {
        this.Origin = origin;
        this.Destination = destination;
        this.DepartureTime=departureTime;
        this.ArrivalTime = arrivalTime;
        this.Route = route;
    }
}

