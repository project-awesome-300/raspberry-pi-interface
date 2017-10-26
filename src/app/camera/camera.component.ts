import { CameraServerService } from '../../providers/camera-server.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Component, DoCheck, ElementRef, OnChanges, OnInit, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { fadeAnimation } from '../_animations/fade-animation';
import { flipAnimation } from '../_animations/flip-animation';
import { Photo } from '../../models/photo.model';
import * as moment from 'moment';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { DialogService } from "ng2-bootstrap-modal";
import { CloseEmailModal }   from '../../models/photo-email.model';
import { AppService } from '../../providers/app.service';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(private _cameraServer: CameraServerService, private _dialogService: DialogService, private _app: AppService) {
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

  loadCameraDisplay() {
    this._busy =  Observable.fromPromise(new Promise(resolve => setTimeout(resolve, 100000))).subscribe();
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

  setCameraDimensions() {
    let h = (window.screen.availHeight) - 180;
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
    console.log("taking photo");
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

  flipButtons() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  discardPhoto() {
    this.flipButtons();
    this.hasPhoto = !this.hasPhoto;
  }

  uploadPhoto(email: string) {
    //add css spinner and remove
    this._photo = new Photo();
    this._photo.base64 = this.base64;
    this._photo.lat = 2342;
    this._photo.lng = 354643;
    this._photo.date = moment();
    this._photo.email = email;
    this._cameraServer.postImageToServer(this._photo).subscribe(result => {
      console.log(result);
    });
  }

  // genPostData() {
  //   this.webcam.captureAsFormData({ fileName: 'file.jpg' })
  //     .then((formData) => {
  //       this._cameraServer.postImageToServer2(formData).subscribe(result => {
  //         console.log(result);
  //       })
  //     })
  //     .catch(e => console.error(e))
  // }

  submitPhoto() {
    this._dialogService.addDialog(ConfirmEmailComponent, {
      title: 'Submit your photo',
      message: `If you want to tag yourself in a this photo, enter your email address in the box below. Clicking Upload will save this photo on our website, which you can view at any time on ${this._app.webAddress}`
    }).subscribe((result: CloseEmailModal) => {
      if (result.submit) {
        this.loadCameraDisplay();
        // this.uploadPhoto(result.email);
      }
    });

  }

}
