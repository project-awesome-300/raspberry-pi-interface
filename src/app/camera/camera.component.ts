import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Component, DoCheck, ElementRef, OnChanges, OnInit, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { fadeAnimation } from '../_animations/fade-animation';
import { flipAnimation } from '../_animations/flip-animation';
import { Photo } from '../../models/photo.model';
import * as moment from 'moment';
import { ConfirmEmailComponent } from '../modals/confirm-email/confirm-email.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { CloseEmailModal, GenericModalClose } from '../../models/modals.model';
import { AppService } from '../../providers/app.service';
import { Subscription } from 'rxjs/Subscription';
import { GenericModalComponent } from '../modals/generic-modal/generic-modal.component';
import { Router } from '@angular/router';
import { GoogleAnalyticsEventsService } from '../../providers/google-analytics-events.service';
import { AnalyticsEvent } from '../../models/AnalyticsEvent';
import { CameraService } from '../../providers/camera.service';
import * as i18next from 'i18next';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  animations: [
    fadeAnimation,
    flipAnimation
  ],
  styleUrls: ['./camera.component.css'],

})
export class CameraComponent implements OnInit, DoCheck {

  @ViewChild(WebCamComponent) webCam: WebCamComponent;
  @ViewChild('camera') cameraBox: ElementRef;

  public cameraReady = false;
  public webcam;
  public options: any;
  public hasPhoto = false;
  public base64;
  public captured = false;
  public imageHeight: number;
  public imageWidth: number;
  public flip = 'inactive';
  private _photo: Photo;
  private _countingDown = false;
  private _countDownIndicator: number;
  private _timer: any;
  private _busy: Subscription;
  private gaCategory = "camera";
  private _event: AnalyticsEvent;

  constructor(private _dialogService: DialogService, private _app: AppService, private _router: Router,
    private _googleAnalyticsEventsService: GoogleAnalyticsEventsService, private _camera: CameraService) {

    // init the camera
    this.options = {
      audio: true,
      video: true,
      fallbackQuality: 200,
      fallbackSrc: 'fallback/jscam_canvas_only.swf'
    };
    this._countDownIndicator = 5;
  }

  public get countingDown(): boolean {
    return this._countingDown;
  }

  public get countDownIndicator(): number {
    return this._countDownIndicator;
  }

  public set countDownIndicator(value: number) {
    this._countDownIndicator = value;
  }

  ngOnInit() {
    this.cameraReady = true;
    this._event = new AnalyticsEvent("camera", "unknown");
    this._photo = new Photo();
    this._camera.getAddressFromLatLng(this._app.lat, this._app.lng).subscribe((res) => {
      this.getLocationMetaData(res);
    });
  }

  onError(err) {
    console.log(err);
  };

  getLocationMetaData(data) {
    if (data.status == "OK") {
      this._photo.address = data.results[0].formatted_address;
      this._photo.placeID = data.results[0].place_id ? data.results[0].place_id : "";
    }
  }

  ngAfterViewInit() {
    //set the dimensions of the camera box
    this.setCameraDimensions()
  }

  setCameraDimensions(): void {
    let h = (window.screen.availHeight) - 70;
    let w = this.cameraBox.nativeElement.offsetWidth;
    this.imageWidth = w;
    this.imageHeight = h;
    this.options.width = w;
    this.options.height = h;
  }


  public ngDoCheck(): void {
    //updating dimensions from view resize
    this.setCameraDimensions();
  }

  beginCountdown(): void {
    this.logEvent("take-photo");
    if (!this.hasPhoto) {
      // this.flipButtons();
      this._countingDown = true;
      let counter = 5;
      this._timer = setInterval(() => {
        if (this.countDownIndicator === 1) {
          clearInterval(this._timer);
          this._snap();
        }
        this.countDownIndicator--;
      }, 1000);
    }
  }

  private _snap(): void {
    return this.webcam.getBase64()
      .then(base => {
        this.base64 = base;
        this.webcam.resizeVideo();
        this.hasPhoto = true;
        this._countingDown = false;
        this.countDownIndicator = 5;
      })
      .catch(e => console.error(e))
  }

  discardPhoto(): void {
    this.hasPhoto = !this.hasPhoto;
    this.logEvent("discard-photo");
  }

  uploadPhoto(email: string) {
    this._photo.base64 = this.base64;
    this._photo.lat = this._app.lat;
    this._photo.lng = this._app.lng;
    this._photo.date = moment().unix().toString();
    this._photo.imageFormat = '.png';
    this._photo.boxID = "dev";
    this._photo.email = email;

    // send image using service here
    this._camera.uploadPhoto(this._photo).subscribe((res) => {
      console.log(res);
    })
    this.showSuccessDialog();
    this.logEvent("upload-dialog-open");
  }

  submitPhoto() {
    this._dialogService.addDialog(ConfirmEmailComponent, {}).subscribe((result: CloseEmailModal) => {
      if (result.submit) {
        this.uploadPhoto(result.email);
        this.logEvent("upload-confirm");
      }
      else this.logEvent("cancel-upload");
    });
  }

  showSuccessDialog() {
    this._dialogService.addDialog(GenericModalComponent, {
      html: `<div class="center"><p class="awesome">${i18next.t("awesome")}!</p><img src="assets/images/smiley-thumbs-up.png" width="300px"><div><p>${i18next.t("photoOnWay")}<br />${i18next.t("checkItOut", { x: 'our mobile app' })}</p></div></div>`,
      time: 5000
    }).subscribe((result: GenericModalClose) => {
      if (result.isClosed)
        this._router.navigateByUrl('/dashboard');
    });
  }

  logEvent(type: string) {
    this._event.eventAction = type;
    this._googleAnalyticsEventsService.emitEvent(this._event);
  }

}
