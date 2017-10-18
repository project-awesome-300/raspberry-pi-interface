import { Component, OnInit } from '@angular/core';
import { BussService } from './buss.service'; 
import { Http,Response } from '@angular/http'; 
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-buss',
  templateUrl: './buss.component.html',
  styleUrls: ['./buss.component.css']
})
export class BussComponent implements OnInit {
  constructor(private _busService: BussService){
    
   }  
  Data = {};

  getBussTimetbles() {
    this._busService.getData().subscribe(data => this.Data = data);
    console.log(this.Data) 
  }


  ngOnInit() {
  }

}


