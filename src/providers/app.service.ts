import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  private _webAddress: string;
  private _mapsApiKey: string;
  private _lat: number;
  private _lng: number;


  constructor() {
    this._webAddress = "www.project-awesome.com";
    this._mapsApiKey = ""
    this._lat = -1;
    this._lng = -1;
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


	public get lat(): number {
		return this._lat;
	}

	public set lat(value: number) {
		this._lat = value;
	}

	public get lng(): number {
		return this._lng;
	}

	public set lng(value: number) {
		this._lng = value;
	}
  


}