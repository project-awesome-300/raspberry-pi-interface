import { Component, OnInit } from '@angular/core';
import { Forecast } from '../../models/forecast';
import { WeatherService } from '../../providers/weather.service';
import { GroupByPipe } from '../../pipes/group-by.pipe';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  myForecast: Forecast[] = [];

  constructor(private ws:WeatherService) { }

  ngOnInit() {
   // this.myForecast =this.ws.forecastNow();
    const lat = 54.2697;
    const lon = -8.4695;
 this.ws.forecastWeather(lat, lon).subscribe(
      (data) =>{
        console.log(data);

        for(let i=0; i<data.list.length;i++){
          const forecastWeather = new Forecast(data.city.name,
                                                data.list[i].main.temp_min,
                                                data.list[i].main.temp_min,
                                                data.list[i].dt_txt,
                                                data.list[i].weather[0].icon);
          console.log(forecastWeather);
          
          
          this.myForecast.push(forecastWeather);
        }
        console.log(this.myForecast);
        return this.myForecast;
      } 
                                      
    )
  }

  
    
  }

