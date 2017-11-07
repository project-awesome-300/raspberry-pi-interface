import { CameraServerService } from '../providers/camera-server.service';
import { WeatherService } from '../providers/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CameraComponent } from './camera/camera.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CapitalizePipe } from '../pipes/capitalise.pipe';




const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'weather', component: ForecastComponent } ,
  { path: 'current', component: CurrentWeatherComponent },
  { path: 'forecast', component: ForecastComponent } 
];





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CameraComponent,
    WebCamComponent,
    WeatherComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [
    CameraServerService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

