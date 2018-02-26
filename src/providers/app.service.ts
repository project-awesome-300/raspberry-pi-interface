import { Injectable } from '@angular/core';

import * as i18next from 'i18next';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import * as moment from 'moment';

@Injectable()
export class AppService {

  private _webAddress: string;
  private _mapsApiKey: string;
  private _lat: number;
  private _lng: number;
  private _lang: string;
  private _viewReady = false;
  private _locationID: number;
 

  constructor() {
    this._webAddress = "www.project-awesome.com";
    this._mapsApiKey = "AIzaSyDL_h4Q3HL5CwDFJrGOzztLY5tBbcldPuk"
    this._lat = -1;
    this._lng = -1;
    this.getLatLngCoOrdinates();
    this._lang = 'en';
    this.loadTranslations();
    this._locationID = 11;
  }


  get locationID(): number {
    return this._locationID;
  }


  loadTranslations() {
    i18next.use(i18nextXHRBackend).init({
      debug: false,
      lng: this.lang,
      fallbackLng: 'en',
      returnEmptyString: true,
      defaultNS: 'static',
      ns: ['static', 'dynamic'],
      backend: {
        loadPath: '../assets/i18n/{{lng}}.json',
        crossDomain: true
      },
      interpolation: {
        prefix: "{{",
        suffix: "}}"
      }
    }, () => {
      this._viewReady = true;
    });
    moment.locale(this.lang);

  }

  set language(lang: string) {
    this._lang = lang;
    moment.locale(lang);
    this._viewReady = false;
    i18next.changeLanguage(lang, () => { this._viewReady = true });
  }

  get viewReady(): boolean {
    return this._viewReady;
  }

  getLatLngCoOrdinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this._lat = position.coords.latitude;
      this._lng = position.coords.longitude;
    });
  }


  public get lang(): string {
    return this._lang;
  }

  public set lang(value: string) {
    this._lang = value;
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
