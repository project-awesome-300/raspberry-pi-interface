import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { ILocalEvent } from '../../models/ILocalEvent';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-local-events',
  templateUrl: './local-events.component.html',
  styleUrls: ['./local-events.component.css']
})
export class LocalEventsComponent implements OnInit {

  public isLoading: boolean;

  public events: Array<ILocalEvent>;
  constructor(private _http: HttpService, private _app: AppService) {
    this.isLoading = true;

  }

  ngOnInit() {
    this._http.fetchLocalEvents(this._app.locationID).subscribe((result: ILocalEvent[]) => {
      this.isLoading = false;
      this.events = result;
    })
  }

}
