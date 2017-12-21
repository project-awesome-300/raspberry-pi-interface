import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';




@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public viewReady = false;
  constructor(private _app: AppService) {
  }

  ngOnInit() {
  }

  
}
