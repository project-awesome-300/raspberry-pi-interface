import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Component, DoCheck, ElementRef, OnChanges, OnInit, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { fadeAnimation } from '../_animations/fade-animation';
import { flashAnimation } from '../_animations/flash-animation';
import { flipAnimation } from '../_animations/flip-animation';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  animations: [
    fadeAnimation,
    flashAnimation,
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

  constructor(private element: ElementRef, private _renderer: Renderer) {
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
}
