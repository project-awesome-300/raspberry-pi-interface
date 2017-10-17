import { Injectable } from '@angular/core';
import { CurrentWeather } from '../models/current-weather';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
   current:CurrentWeather = new CurrentWeather('New York', '80', 'https://png.icons8.com/sun/color/24','sunny', '96','72')
   //current:CurrentWeather;
    constructor(private http:Http) {}

    weatherNow(){
        return this.current;
    } 

    localWeather(lat:number, lon:number){
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f9910e16c173698955d13abe28b6879a&units=metric`)
        .map((response:Response) => response.json());
    }
}