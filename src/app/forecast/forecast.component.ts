import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { Forecast } from '../../models/forecast';
import { WeatherService } from '../../providers/weather.service';
import { GroupByPipe } from '../../pipes/group-by.pipe';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CapitalizePipe } from '../../pipes/capitalise.pipe';
import { AppService } from '../../providers/app.service';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  //myForecast: Object[] = [];
  fullDays: Forecast[] = [];
  days: Forecast[] = [];
  ChangeView: Boolean = true;

  constructor(private ws: WeatherService, private _app: AppService) { }

  ngOnInit() {
    this.ws.forecastWeather(this._app.lat, this._app.lng).subscribe((data) => { 
 
      for (let i = 0; i < data.list.length; i += 1) { 
        this.days[i] = new Forecast( 
         data.city.name, 
          data.list[i].main.temp_max, 
          data.list[i].main.temp_min, 
          data.list[i].dt_txt, 
          data.list[i].weather[0].icon, 
          data.list[i].weather[0].description, 
          data.list[i].wind.speed, 
          data.list[i].clouds.all 
        ); 
        //this.myForecast.push(this.days); 
 
        this.fullDays = _.groupBy(this.days, function (row) { 
          return moment(row.date).format("DDMMYYYY") 
        }) 
        // _.orderBy('date', 'asc'); 
      } 
    }) 
  } 
  generateArray(Forecast) { 
    return Object.keys(Forecast).map((key) => { return Forecast[key] }); 
  } 
}