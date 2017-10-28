import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Component, DoCheck, ElementRef, OnChanges, OnInit, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { fadeAnimation } from '../_animations/fade-animation';
import { flipAnimation } from '../_animations/flip-animation';
import { Photo } from '../../models/photo.model';
import * as moment from 'moment';
import { ConfirmEmailComponent } from '../modals/confirm-email/confirm-email.component';
import { DialogService } from "ng2-bootstrap-modal";
import { CloseEmailModal, GenericModalClose } from '../../models/modals.model';
import { AppService } from '../../providers/app.service';
import { Subscription } from 'rxjs/Subscription';
import { GenericModalComponent } from '../modals/generic-modal/generic-modal.component';
import { Router } from '@angular/router';

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
  public flip = "inactive";
  private _photo: Photo;
  private _countingDown = false;
  private _countDownIndicator: number;
  private _timer: any;
  private _busy: Subscription;

  constructor(private _dialogService: DialogService, private _app: AppService, private _router: Router) {
    //init the camera
    this.options = {
      audio: true,
      video: true,
      fallbackQuality: 200,
      fallbackSrc: 'fallback/jscam_canvas_only.swf'
    };
    this._countDownIndicator = 5;
    //waiting for camera to start up before enabling the view
    // this.loadCameraDisplay().subscribe(() => { this.cameraReady = true; });
  }


  public get countDownIndicator(): number {
    if (this._countDownIndicator === 1) {
      clearInterval(this._timer);
      this._snap();
    }
    return this._countDownIndicator;
  }

  public set countDownIndicator(value: number) {
    this._countDownIndicator = value;
  }

  ngOnInit() {
    this.cameraReady = true;
  }

  onSuccess(stream: any) {
  };

  onError(err) {
    console.log(err);
  };

  ngAfterViewInit() {
    //set the dimensions of the camera box
    this.setCameraDimensions()
  }

  setCameraDimensions(): void {
    let h = (window.screen.availHeight) - 50;
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
    if (!this.hasPhoto) {
      // this.flipButtons();
      this._countingDown = true;
      let counter = 5;
      this._timer = setInterval(() => {
        this.countDownIndicator--;
      }, 1000);
    }
  }

  private _snap(): void {
    return this.webcam.getBase64()
      .then(base => {
        this.base64 = base;
        this.webcam.resizeVideo()
        this.hasPhoto = true;
        this._countingDown = false;
        this._countDownIndicator = 5;
      })
      .catch(e => console.error(e))
  }

  flipButtons(): void {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  discardPhoto(): void {
    this.flipButtons();
    this.hasPhoto = !this.hasPhoto;
  }

  uploadPhoto(email: string) {
    this._photo = new Photo();
    this._photo.base64 = this.base64;
    this._photo.lat = this._app.lat;
    this._photo.lng = 354643;
    this._photo.date = moment();
    this._photo.email = email;
    console.log("Sending Photo");
    this._dialogService.addDialog(GenericModalComponent, {
      html: `<div><img src="assets/images/smiley-thumbs-up.png"></div><div><h2>Awesome! Your photo is on it's way to our server. Check it out on<br/>${this._app.webAddress}</h2></div>`,
      time: 5000
    }).subscribe((result: GenericModalClose) => {
      if (result.isClosed)
        this._router.navigateByUrl('/');
    })
  }

  submitPhoto() {
    this._dialogService.addDialog(ConfirmEmailComponent, {
      title: 'Submit your photo',
      message: `If you want to tag yourself in a this photo, enter your email address in the box below. Clicking Upload will save this photo on our website, which you can view at any time on ${this._app.webAddress}`
    }).subscribe((result: CloseEmailModal) => {
      if (result.submit) {
        this.uploadPhoto(result.email);
      }
    });

  }

}
