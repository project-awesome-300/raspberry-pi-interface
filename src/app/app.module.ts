import { CameraServerService } from '../providers/camera-server.service';
import { BussService } from './buss/buss.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CameraComponent } from './camera/camera.component';
import { BussComponent } from './buss/buss.component';
import { AgmCoreModule } from '@agm/core'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'buss', component: BussComponent }    
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CameraComponent,
    WebCamComponent,
    BussComponent
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
    BussService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
