import { resetFakeAsyncZone } from '@angular/core/testing';
import { CameraServerService } from '../../providers/camera-server.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Component, DoCheck, ElementRef, OnChanges, OnInit, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { fadeAnimation } from '../_animations/fade-animation';
import { flipAnimation } from '../_animations/flip-animation';
import { Photo } from '../../models/photo';
import * as moment from 'moment';

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

  background = "../assets/images/background/sligo.jpg";
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

  constructor(private _cameraServer: CameraServerService) {
    //init the camera
    this.options = {
      audio: true,
      video: true,
      fallbackQuality: 200,
      fallbackSrc: 'fallback/jscam_canvas_only.swf'
    };
    //waiting for camera to start up before enabling the view
    // this.loadCameraDisplay().subscribe(() => { this.cameraReady = true; });
  }

  ngOnInit() {
    this.cameraReady = true;
  }

  loadCameraDisplay() {
    return Observable.fromPromise(new Promise(resolve => setTimeout(resolve, 3000)));
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
    this.imageWidth = this.cameraBox.nativeElement.offsetWidth - 40;
    this.imageHeight = this.cameraBox.nativeElement.offsetHeight;
    this.options.width = this.cameraBox.nativeElement.offsetWidth - 40;
    this.options.height = this.cameraBox.nativeElement.offsetHeight;
  }


  public ngDoCheck(): void {
    //updating dimensions from view resize
    this.setCameraDimensions();
  }

  takePhoto() {
    if (!this.hasPhoto) {
      this.flipButtons();
      console.log("taking photo");
      return this.webcam.getBase64()
        .then(base => {
          this.base64 = base;
          this.webcam.resizeVideo()
          this.hasPhoto = true;
          // setTimeout(() => this.webcam.resizeVideo(), 0)
        })
        .catch(e => console.error(e))
      //    setTimeout(()=>this.webcam.onResize(), 0)
    }
  }

  flipButtons() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  discardPhoto() {
    this.flipButtons();
    this.hasPhoto = !this.hasPhoto;
  }

  uploadPhoto() {
    this._photo = new Photo();
    this._photo.base64 = this.base64;
    this._photo.lat = 2342;
    this._photo.lng = 354643;
    this._photo.date = moment();

    this._cameraServer.postImageToServer(this._photo).subscribe(result => {
      console.log(result);
    })
  }

  genPostData() {
    this.webcam.captureAsFormData({ fileName: 'file.jpg' })
      .then((formData) => {
        this._cameraServer.postImageToServer2(formData).subscribe(result => {
          console.log(result);
        })
      })
      .catch(e => console.error(e))
  }

  //a pretend process that would post the webcam photo taken
  // postFormData(formData) {
  //   const config = {
  //     method: "post",
  //     url: "http://www.aviorsciences.com/",
  //     body: formData
  //   }

  //   const request = new Request(config)

  //   return this.http.request(request)
  // }

}
