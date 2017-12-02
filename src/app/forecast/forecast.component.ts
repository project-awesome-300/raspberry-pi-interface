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
    // this.myForecast =this.ws.forecastNow();
    this.ws.forecastWeather(this._app.lat, this._app.lng).subscribe(
      (data) => {
        console.log('this is data');
        console.log(data);

        for (let i = 0; i < data.list.length; i+=1) {
          /*           const forecastWeather = new Forecast(data.city.name,
                      data.list[i].main.temp_max,
                      data.list[i].main.temp_min,
                      data.list[i].dt_txt,
                      data.list[i].weather[0].icon); */
          // const forecastWeather = {
          //   cityName: data.city.name,
          //   maxTemp: data.list[i].main.temp_max,
          //   minTemp: data.list[i].main.temp_min,
          //   date: data.list[i].dt_txt,
          //   icon: data.list[i].weather[0].icon
          // };
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
          console.log('this is forecast weather');
          console.log(forecastWeather);
          this.myForecast.push(forecastWeather);


          //working part ==============
          this.fullDays = _.groupBy(this.myForecast, function (row) {
            // return row.date;
          
            return moment(row.date).format("DDMMYYYY")
           

          }
        
      )
      console.log("this.fullDays")
      console.log(this.fullDays)
      _.orderBy('date','asc');
      console.log(this.fullDays)
//=============================

          //           this.fullDays = _.chain(_.map(this.days, "days"))
          //           //.flattenDeep()
          //           .groupBy(function (myForecast) {
          //             console.log('data');
          //             //console.log(this.myForecast)
          //             console.log(data);
          //             return moment(myForecast.date, "YYYY-MM-DD HH:MM:SS").format("DD/MM/YYYY")
          //           })
          //           .toPairs()
          //           .map(function (currentItem) {
          //             return _.zipObject(["days", this.myForecast], currentItem)
          //           })
          //           .value();
          //         }

          //         this.days = _.values(data)



          //       console.log('days');
          //       console.log(this.days);
          //         console.log('this is my forecat');
          //         console.log(this.myForecast);
          //         console.log('^^ myforecast');
          // /*              //this.myForecast[i] = forecastWeather;
          //             this.days = _.chain(this.myForecast) 
          //             .map()
          //             .flattenDeep()
          //             .value()
          //             console.log('days');
          //             console.log(this.days); */
          //         // for(let i=0; this.myForecast.length;i++){

          //         this.fullDays = _.chain(_.map(this.days, "days"))
          //           .flattenDeep()
          //           .groupBy(function (myForecast) {
          //             console.log('data');
          //             //console.log(this.myForecast)
          //             console.log(data);
          //             return moment(myForecast.date, "YYYY-MM-DD HH:MM:SS").format("DD/MM/YYYY")
          //           })
          //           .toPairs()
          //           .map(function (currentItem) {
          //             return _.zipObject(["date", "days"], currentItem)
          //           })
          //           .value();
          //         // }
          //         console.log('this is result');
          //         console.log(this.fullDays);
          //       // return this.myForecast;






          //       })
          //   }





          /* groupForecasts(){
          this.fullDay = _.chain(_.map(this.myForecast,"forecasts"))
          .groupBy(function (data){
            return moment(data.date).format("YYYY-MM-DD HH:MM:SS");
          })
          .toPairs()
          .map(function (currentItem) {
            return _.zipObject(["date", "forecasts"], currentItem);
          })
          .value()
          console.log(this.myForecast);
          } */

        }
        console.log('grouped');
        console.log(this.fullDays);
        	

      })
  }
  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
 }

}