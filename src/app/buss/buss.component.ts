
import { Component, OnInit } from '@angular/core';
//import { BussService } from '../../providers/buss.service'; 
import { Http, Response } from '@angular/http';
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
      new Buss('Carton', '(Classibawn Drive)', '7:30', '8:00', '8:30', '9:00', '9:30', '00', '30',  '17:00', '17:30', '18:00'),
      new Buss('Bundoran Rd', '(Abbotts)', '7:36', '8:06', '8:36', '9:06', '9:36', '06', '36', '17:06', '17:36', '18:06'),
      new Buss('I.T.Sligo', '(Stop on campus)', '7:40', '8:10', '8:40', '9:10', '9:40', '10', '40', '17:10', '17:40', '18:10'),
      new Buss('Sligo Hospital', '(The Mall)', '7:43', '8:13', '8:43', '9:13', '9:43', '13', '43',  '17:13', '17:43', '18:13'),
      new Buss('Town Centre', '(Abbey St)', '7:46', '8:16', '8:46', '9:16', '9:46', '16', '46',  '17:16', '17:46', '18:16'),
      new Buss('Doorly Park', '(Doorly Park)', '7:49', '8:19', '8:49', '9:19', '9:49', '19', '49',  '17:19', '17:49', '18:19'),
      new Buss('Cranmore', '(devins drive)', '7:53', '8:23', '8:53', '9:23', '9:53', '23', '53', '17:23', '17:53', '18:23'),
      new Buss('Cemetery Rd', '(Cemetery Rd)', '7:56', '8:26', '8:56', '9:26', '9:56', '26', '56', '17:26', '17:56', '18:26'),
      new Buss('Cairns Rd', '(Bus Stop)', '7:59', '8:29', '8:59', '9:29', '9:59', '29', '59',  '17:29', '17:59', '18:29'),
      new Buss('      ', '     ', '  ', '', '', '', '', '', '', '',  '', ''),
      new Buss('Pearse Rd', '(Rd Jctn)', '8:02', '8:32', '9:02', '9:32', '10:02', '32', '02', '17:32', '18:02', '18:32'),
      new Buss('Crozon Park', '(Crozon Crescent)', '8:04', '8:34', '9:04', '9:34', '10:04', '34', '04',  '17:34', '18:04', '18:34'),
      new Buss('Caltragh Rd', '(Pensions Office)', '8:05', '8:35', '9:05', '9:35', '10:05', '35', '05', '17:35', '18:05', '18:35'),
      new Buss('Town Centre', '(Hg St-Chapal)', '8:10', '8:40', '9:10', '9:40', '10:10', '40', '10',  '17:40', '18:10', '18:40'),
      new Buss('Town Centre', '(Markievicz Rd)', '8:14', '8:44', '9:14', '9:44', '10:14', '44', '14', '17:44', '18:14', '-'),
      new Buss('Sligo Hospital', '(The Mall)', '8:16', '8:46', '9:16', '9:46', '10:16', '46', '16',  '17:46', '18:16', '-'),
      new Buss('I.T.Sligo', '(Stop on campus)', '8:19', '8:49', '9:19', '9:49', '10:19', '49', '19', '17:49', '18:19', '-'),
      new Buss('Bundoran Rd', '(Abbotts)', '8:23', '8:53', '9:23', '9:53', '10:23', '53', '23',  '17:53', '18:23', '-'),
      new Buss('Carton', '(Classibawn Drive)', '8:29', '8:59', '9:29', '9:59', '10:29', '59', '29', '17:59', '18:29', '-'),





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

