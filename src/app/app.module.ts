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
import { FoodComponent } from './food/food.component';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { WeatherComponent } from './weather/weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CapitalizePipe } from '../pipes/capitalise.pipe';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmEmailComponent } from './modals/confirm-email/confirm-email.component';
import { AppService } from '../providers/app.service';
import { GenericModalComponent } from './modals/generic-modal/generic-modal.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleAnalyticsEventsService } from '../providers/google-analytics-events.service';




const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'weather', component: ForecastComponent } ,
  { path: 'current', component: CurrentWeatherComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: 'food', component: FoodComponent },
  { path: 'map', component: MapComponent },
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
    WebCamComponent,
    ConfirmEmailComponent,
    GenericModalComponent,
    FoodComponent,
    MapComponent,
    StarRatingComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDL_h4Q3HL5CwDFJrGOzztLY5tBbcldPuk",
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule
  ],
  providers: [
    GoogleMapsAPIWrapper,
    WeatherService,
    AppService,
    GoogleAnalyticsEventsService
  ],
  entryComponents: [
    ConfirmEmailComponent,
    GenericModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

