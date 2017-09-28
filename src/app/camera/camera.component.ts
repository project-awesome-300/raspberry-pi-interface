import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  background = "../assets/images/background/sligo.jpg";
  constructor() { }

  ngOnInit() {
  }

}
