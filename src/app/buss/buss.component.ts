
import { Component, OnInit} from '@angular/core';
//import { BussService } from '../../providers/buss.service'; 
import { Http,Response } from '@angular/http'; 
import { Buss } from '../../models/buss';

@Component({
  selector: 'app-buss',
  templateUrl: './buss.component.html', 
  styleUrls: ['./buss.component.css'] 
}) 

export class BussComponent implements OnInit {

  buss: Buss[];
  
    constructor() {
      this.buss = [
        new Buss('Sligo(Bus Staion)','Coolaney (Radharc Na hAbhann)', '06:25', '6:59' ,'475'),
        new Buss('Sligo(Bus Staion)','Enniskillen (Ulsterbus Depot)','7:30','8:55','458'),
        new Buss('Sligo(Bus Staion)','Ballyshannon (Bus Station)','8:55', '9:45','480'),
        new Buss('Sligo(Bus Staion)','Enniskillen (Ulsterbus Depot)','14:45','16:10','458'),
        new Buss('Sligo(Bus Staion)','Coolaney (Radharc Na hAbhann)', '17:20', '18:04' ,'475'),
        new Buss('Sligo(Bus Staion)','Ballyshannon (Bus Station)','18:10', '19:05' ,'480'),    
        new Buss('Sligo(Bus Staion)','Dublin Airport','6:30', '9:50','23'),
      ]
    }


  ngOnInit() {


    }; 

    
  


  }







/* old working API
 
  constructor(private _busService: BussService){
    
   }  
  Data = {};

  getBussTimetbles() {
    this._busService.getData().subscribe(data => this.Data = data);
    console.log(this.Data) 
  }

  ngOnInit() {
    this.getBussTimetbles();
  }
  */

