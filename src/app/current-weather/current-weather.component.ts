import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../providers/weather.service';
import { CurrentWeather } from '../../models/current-weather';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  myWeather:CurrentWeather;
  
  constructor(private ws:WeatherService) { }

  ngOnInit() {
    this.myWeather = this.ws.weatherNow();
    const lat = 54.2697;
    const lon = -8.4695;
    this.ws.localWeather(lat, lon).subscribe(
      (data) =>{
        console.log(data);
        this.myWeather = new CurrentWeather(data.name,
                                            data.main.temp,
                                            data.weather[0].icon,
                                            data.weather[0].description,
                                            data.main.temp_max,
                                            data.main.temp_min)
      }
    )
  }

}
