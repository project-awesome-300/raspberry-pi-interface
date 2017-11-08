import { CameraServerService } from '../providers/camera-server.service';
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
import { DirectionsMapDirective } from './googlemap/google-map.directive';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'food', component: FoodComponent } ,
  { path: 'map', component: MapComponent }     
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CameraComponent,
    WebCamComponent,
    FoodComponent,
    MapComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDL_h4Q3HL5CwDFJrGOzztLY5tBbcldPuk",
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CameraServerService,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
