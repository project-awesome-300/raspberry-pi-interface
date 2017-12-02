import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Photo } from '../models/photo.model';


@Injectable()
export class CameraService {

  private _url: string;
  constructor(private _http: Http) { 
    this._url = 'http://localhost:8080/api/convertAndUpload';
  }

  public uploadPhoto(data: Photo) {
    return this._http.post(this._url, data)
      .map((response: Response) => response.json());
  }
}
