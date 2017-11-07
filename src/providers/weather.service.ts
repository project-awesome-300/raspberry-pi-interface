import { Injectable } from '@angular/core';
import { CurrentWeather } from '../models/current-weather';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Forecast } from '../models/forecast';
import * as moment from 'moment';

@Injectable()
export class WeatherService {
   current:CurrentWeather= new CurrentWeather('','','','','','')
   //dummyForecast:Forecast = new Forecast('Sligo','95','80','12/12/12','https://png.icons8.com/sun/color/24')
   //current:CurrentWeather;
    constructor(private http:Http) {}

    weatherNow(){
        return this.current;
    } 

//     forecastNow()
// {
//     return this.dummyForecast;
// }
    localWeather(lat:number, lon:number){
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f9910e16c173698955d13abe28b6879a&units=metric`)
        .map((response:Response) => response.json());
    }

    forecastWeather(lat:number, lon:number){
        return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f9910e16c173698955d13abe28b6879a&units=metric`)
        .map((response:Response) => response.json());
    }


    groupWeatherByDay(list) {
        const days = new Map() // use Map as need we to maintain insertion order
      
        list.forEach( (w) => {
          const day = moment(w.dt*1000).format("dddd Do MMMM")
          if( !days[day] ) days[day] = []
          days[day].push(w)
        })
      
        return days;
      }
      
      
    }
