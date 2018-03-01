//services
import { HttpService } from '../providers/http.service';
import { CameraService } from '../providers/camera.service';
import { WeatherService } from '../providers/weather.service';
import { GoogleAnalyticsEventsService } from '../providers/google-analytics-events.service';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AppService } from '../providers/app.service';
import { BussService } from '../providers/buss.service';
//modules
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//components
import { LocalEventsComponent } from './local-events/local-events.component';
import { LanguageComponent } from './language/language.component';
import { SundayBussComponent } from './sunday-buss/sunday-buss.component';
import { BussComponent } from './buss/buss.component';
import { GenericModalComponent } from './modals/generic-modal/generic-modal.component';
import { ConfirmEmailComponent } from './modals/confirm-email/confirm-email.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MapComponent } from './map/map.component';
import { FoodComponent } from './food/food.component';
import { CameraComponent } from './camera/camera.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
//pipes
import { MomentPipe } from '../pipes/moment.pipe';
import { TranslatePipe } from '../pipes/translate.pipe';
import { GroupByPipe } from '../pipes/group-by.pipe';
import { CapitalizePipe } from '../pipes/capitalise.pipe';

//routes defined
const routes: Routes = [
  { path: '', redirectTo: 'language', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'language', component: LanguageComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'weather', component: ForecastComponent },
  { path: 'current', component: CurrentWeatherComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: 'food', component: FoodComponent },
  { path: 'map', component: MapComponent },
  { path: 'sundaybus', component: SundayBussComponent },
  { path: 'bus', component: BussComponent },
  { path: 'events', component: LocalEventsComponent },
  { path: '**', redirectTo: 'language', pathMatch: 'full' }
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
    MomentPipe,
    LanguageComponent,
    LocalEventsComponent
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
    HttpService,
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

