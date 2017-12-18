import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';

import * as i18next from 'i18next';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import * as moment from 'moment';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public viewReady = false;
  constructor(private _app: AppService) {
    this.loadTranslations();
    moment.locale(this._app.lang);
  }

  ngOnInit() {
  }

  loadTranslations() {
    i18next.use(i18nextXHRBackend).init({
      debug: false,
      lng: this._app.lang,
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
      this.viewReady = true;
    });
  }
}
