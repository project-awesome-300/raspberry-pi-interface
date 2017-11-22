import { Injectable } from "@angular/core";
import { AnalyticsEvent } from "../models/AnalyticsEvent";
declare var ga: any;


@Injectable()
export class GoogleAnalyticsEventsService {

  public emitEvent(analyticsEvent: AnalyticsEvent) {
    ga('send', 'event', analyticsEvent);
  }
}