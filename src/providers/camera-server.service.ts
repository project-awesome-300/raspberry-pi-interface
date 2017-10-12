import { Photo } from '../models/photo';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CameraServerService {

  constructor(private _http: Http) { }


  postImageToServer(photo: Photo){
    let fd = new FormData();
    fd.append('file', photo.base64);

    return this._http.post('http://localhost:3000', fd);
  }

  postImageToServer2(formData){
    return this._http.post('http://localhost:3000', formData);
  }
}
