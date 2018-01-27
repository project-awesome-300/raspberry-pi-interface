import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { ILocalEvent } from '../../models/ILocalEvent';

@Component({
  selector: 'app-local-events',
  templateUrl: './local-events.component.html',
  styleUrls: ['./local-events.component.css']
})
export class LocalEventsComponent implements OnInit {

  public events: Array<ILocalEvent>;
  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.fetchLocalEvents().subscribe((result: ILocalEvent[]) => {
      this.events = result;
    })
  }

}
