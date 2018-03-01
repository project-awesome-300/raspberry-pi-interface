import { Component, OnInit } from '@angular/core';
import { AnalyticsEvent } from '../../models/AnalyticsEvent';
import { GoogleAnalyticsEventsService } from '../../providers/google-analytics-events.service';
import { Router } from '@angular/router';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  
  // set background image
  public background = 'assets/images/logo.png';
  private _event: AnalyticsEvent

  constructor(
    private _googleAnalyticsEventsService: GoogleAnalyticsEventsService,
    private _router: Router,
    private _appService: AppService
  ) { }

  ngOnInit() {
    this._event = new AnalyticsEvent("language", "unknown");
  }

  languageChosen(lang: string) {
    this._event.eventAction = lang;
    this._googleAnalyticsEventsService.emitEvent(this._event);
    this._appService.language = lang;
    //router nagivate to dashboard
    this._router.navigate(['/dashboard']);

  }

}
