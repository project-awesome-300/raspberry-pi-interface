import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ILocalEvent } from '../models/ILocalEvent';

@Injectable()
export class HttpService {

  private _baseURL: string;

  constructor(private _http: Http) {
    this._baseURL = '../assets/data/mock-events.json';
  }

  private _errorHandler(error: Response) {
    return Observable.throw(error);
  }

  
  fetchLocalEvents() {
    return this._http.get(this._baseURL)
      .map((res: Response) => <ILocalEvent[]>res.json())
      .catch(this._errorHandler);
  }
}
