import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public viewReady = false;
  constructor(public app: AppService, private _router: Router) {
  }

  ngOnInit() {
  }

  goHome() {
    this._router.navigateByUrl('/');
  }
}
