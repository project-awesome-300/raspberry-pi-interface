import { animate, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { WebCamComponent } from 'ack-angular-webcam/webcam.component';
import { Component, DoCheck, ElementRef, OnChanges, OnInit, Renderer, SimpleChanges, ViewChild } from '@angular/core';
import { fadeAnimation } from '../_animations/fade-animation';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  animations: [
    fadeAnimation
    // trigger(
    //   'fade',
    //   [
    //     transition(
    //     ':enter', [
    //       style({opacity: 0}),
    //       animate('500ms', style({'opacity': 1}))
    //     ]
    //   ),
    //   transition(
    //     ':leave', [
    //       style({'opacity': 1}),
    //       animate('500ms', style({'opacity': 0}))
    //     ]
    //   )]
    // )
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
    this.options.width = this.cameraBox.nativeElement.offsetWidth - 40;
    this.options.height = this.cameraBox.nativeElement.offsetHeight;
  }


  public ngDoCheck(): void {
    //updating dimensions from view resize
    this.setCameraDimensions();
  }
}
