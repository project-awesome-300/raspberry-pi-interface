import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Photo } from '../models/photo.model';
import { AppService } from './app.service';


@Injectable()
export class CameraService {

  private _url: string;
  constructor(private _http: Http, private _appService: AppService) { 
    this._url = 'http://localhost:8080/api/convertAndUpload';
  }

  public uploadPhoto(data: Photo) {
    return this._http.post(this._url, data)
      .map((response: Response) => response.json());
  }

  public getAddressFromLatLng(lat: number, lng:number){
    let uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this._appService.mapsApiKey}`
    return this._http.get(uri).map((response:Response) => response.json());
    
  }
}
