import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  private _webAddress: string;
  private _mapsApiKey: string;
  constructor() {
    this._webAddress = "www.project-awesome.com";
    this._mapsApiKey = ""
  }


  public get webAddress(): string {
    return this._webAddress;
  }

  public set webAddress(value: string) {
    this._webAddress = value;
  }

  public get mapsApiKey(): string {
    return this._mapsApiKey;
  }

  public set mapsApiKey(value: string) {
    this._mapsApiKey = value;
  }


}
