import { Component, OnInit } from '@angular/core';
import { BussService } from './buss.service'; 

@Component({
  selector: 'app-buss',
  templateUrl: './buss.component.html',
  styleUrls: ['./buss.component.css']
})
export class BussComponent implements OnInit {


  constructor(private _busService: BussService){
    
   } 

  ngOnInit() {
  }

}
