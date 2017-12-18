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
  myForecast: Object[] = [];
  fullDays: Object[] = [];
  days: Forecast[] = [];

  constructor(private ws: WeatherService, private _app: AppService) { }

  ngOnInit() {
    this.ws.forecastWeather(this._app.lat, this._app.lng).subscribe((data) => {

      for (let i = 0; i < data.list.length; i += 1) {
        const forecastWeather = {
          cityName: data.city.name,
          maxTemp: data.list[i].main.temp_max,
          minTemp: data.list[i].main.temp_min,
          date: data.list[i].dt_txt,
          icon: data.list[i].weather[0].icon,
          desc: data.list[i].weather[0].description,
          wind: data.list[i].wind.speed,
          clouds: data.list[i].clouds.all
        };
        this.myForecast.push(forecastWeather);

        this.fullDays = _.groupBy(this.myForecast, function (row) {
          return moment(row.date).format("DDMMYYYY")
        })
        // _.orderBy('date', 'asc');
      }
    })
  }
  generateArray(obj) {
    return Object.keys(obj).map((key) => { return obj[key] });
  }

}