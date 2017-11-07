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
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmEmailComponent } from './modals/confirm-email/confirm-email.component';
import { FormsModule } from '@angular/forms';
import { AppService } from '../providers/app.service';
import { GenericModalComponent } from './modals/generic-modal/generic-modal.component';




const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'weather', component: WeatherComponent } ,
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
    ForecastComponent
    WebCamComponent,
    ConfirmEmailComponent,
    GenericModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule,
    BootstrapModalModule
  ],
  providers: [
    CameraServerService,
    WeatherService
    AppService
  ],
  entryComponents: [
    ConfirmEmailComponent,
    GenericModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

