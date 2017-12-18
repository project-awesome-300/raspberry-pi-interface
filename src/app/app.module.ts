import { BussService } from '../providers/buss.service';
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
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CapitalizePipe } from '../pipes/capitalise.pipe';
import { GroupByPipe } from '../pipes/group-by.pipe';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmEmailComponent } from './modals/confirm-email/confirm-email.component';
import { AppService } from '../providers/app.service';
import { GenericModalComponent } from './modals/generic-modal/generic-modal.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleAnalyticsEventsService } from '../providers/google-analytics-events.service';
import { BussComponent } from './buss/buss.component';
import { SundayBussComponent } from './sunday-buss/sunday-buss.component';
import { WeatherService } from '../providers/weather.service';
import { CameraService } from '../providers/camera.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { MomentPipe } from '../pipes/moment.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'weather', component: ForecastComponent } ,
  { path: 'current', component: CurrentWeatherComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: 'food', component: FoodComponent },
  { path: 'map', component: MapComponent },
  { path: 'sundaybus', component: SundayBussComponent },
  { path: 'bus', component: BussComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CameraComponent,
    WebCamComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    WebCamComponent,
    ConfirmEmailComponent,
    GenericModalComponent,
    FoodComponent,
    MapComponent,
    StarRatingComponent,
    CapitalizePipe,
    GroupByPipe,
    BussComponent,
    SundayBussComponent,
    TranslatePipe,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDL_h4Q3HL5CwDFJrGOzztLY5tBbcldPuk",
      libraries: ["places"],
      // language: "fr"
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule
  ],
  providers: [
    BussService,
    GoogleMapsAPIWrapper,
    WeatherService,
    AppService,
    GoogleAnalyticsEventsService,
    CameraService
  ],
  entryComponents: [
    ConfirmEmailComponent,
    GenericModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

