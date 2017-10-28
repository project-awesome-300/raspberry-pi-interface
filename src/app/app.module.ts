import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CameraComponent } from './camera/camera.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { FormsModule } from '@angular/forms';
import { AppService } from '../providers/app.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'camera', component: CameraComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CameraComponent,
    WebCamComponent,
    ConfirmEmailComponent
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
    AppService
  ],
  entryComponents: [
    ConfirmEmailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
