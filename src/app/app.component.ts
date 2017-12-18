import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../providers/app.service';


declare var ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(private _router: Router, private _app: AppService) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }


}

