import { Component, OnInit } from '@angular/core';
import { SundayBuss } from '../../models/sundayBuss';

@Component({
  selector: 'app-sunday-buss',
  templateUrl: './sunday-buss.component.html',
  styleUrls: ['./sunday-buss.component.css']
})
export class SundayBussComponent implements OnInit {
  sundaybuss: SundayBuss[];

  constructor() {
    this.sundaybuss = [
      new SundayBuss('Carton', '(Classibawn Drive)', '11:00', '12:00', '00', '14:00', '15:00', '16:00', '17:00', '18:00'),
      new SundayBuss('Bundoran Rd', '(Abbotts)', '11:06', '12:06', '06', '14:06', '15:06', '16:06', '17:06', '18:06'),
      new SundayBuss('I.T.Sligo', '(Stop on campus)', '11:10', '12:10', '10', '14:10', '15:10', '16:10', '17:10', '18:10'),
      new SundayBuss('Sligo Hospital', '(The Mall)', '11:13', '12:13', '13', '14:13', '15:13', '16:13', '17:13', '18:13'),
      new SundayBuss('Town Centre', '(Abbey St)', '11:16', '12:16', '16', '14:16', '15:16', '16:16', '17:16', '18:16'),
      new SundayBuss('Doorly Park', '(Doorly Park)', '11:19', '12:19', '19', '14:19', '15:19', '16:19', '17:19', '18:19'),
      new SundayBuss('Cranmore', '(devins drive)', '11:23', '12:23', '23', '14:23', '15:23', '16:23', '17:23', '18:23'),
      new SundayBuss('Cemetery Rd', '(Cemetery Rd)', '11:26', '12:26', '26', '14:26', '15:26', '16:26', '17:26', '18:26'),
      new SundayBuss('Cairns Rd', '(Bus Stop)', '11:29', '12:29', '29', '14:29', '15:29', '16:29', '17:29', '18:29'),
      new SundayBuss('      ', '     ', '  ', '', '', '', '', '', '', ''),
      new SundayBuss('Pearse Rd', '(Rd Jctn)', '11:32', '12:32', '32', '14:32', '15:32', '16:32', '17:32', '18:32'),
      new SundayBuss('Crozon Park', '(Crozon Crescent)', '11:34', '12:34', '34', '14:34', '15:34', '16:34', '17:34', '18:34'),
      new SundayBuss('Caltragh Rd', '(Pensions Office)', '11:35', '12:35', '35', '14:35', '15:35', '16:35', '17:35', '18:35'),
      new SundayBuss('Town Centre', '(Hg St-Chapal)', '11:40', '12:40', '40', '14:40', '15:40', '16:40', '17:40', '18:40'),
      new SundayBuss('Town Centre', '(Markievicz Rd)', '11:44', '12:44', '44', '14:44', '15:44', '16:44', '17:44', '-'),
      new SundayBuss('Sligo Hospital', '(The Mall)', '11:46', '12:46', '46', '14:46', '15:46', '16:46', '17:46', '-'),
      new SundayBuss('I.T.Sligo', '(Stop on campus)', '11:49', '12:49', '49', '14:49', '15:49', '16:49', '17:49', '-'),
      new SundayBuss('Bundoran Rd', '(Abbotts)', '11:53', '12:53', '53', '14:53', '15:53', '16:53', '17:53', '-'),
      new SundayBuss('Carton', '(Classibawn Drive)', '11:59', '12:59', '59', '14:59', '15:59', '16:59', '17:59', '-'),


    ]
  }


  ngOnInit() {
  }

}






