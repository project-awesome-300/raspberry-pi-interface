import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BussService {

  constructor (
    private http: Http
  ) {}

  getData() {
    return this.http.get(`https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7602&format=json`)
    .map((res:Response) => res.json());
  }


  /*http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=D 
  http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML 
  
  https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7602&format=json
  */


}



