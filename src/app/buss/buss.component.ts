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
title='app works';
private ApiUrl = 'https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7602&format=json';

data: any= {};

constructor(private http:Http){
  console.log('wotking....')

  this.getData();
  this.getBussTimetbles();

}
//getting api data
getData(){
  return this.http.get(this.ApiUrl)
  .map((res:Response)=> res.json)
}

getBussTimetbles(){
  this.getData().subscribe(data => {
    console.log(data)
    this.data=data;
  })
}



/*
  constructor(private _busService: BussService){
    
   } */

  ngOnInit() {
  }

}
