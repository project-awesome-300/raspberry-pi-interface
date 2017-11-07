import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { GenericModalOpen, GenericModalClose } from '../../../models/modals.model';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent extends DialogComponent<GenericModalOpen, GenericModalClose> implements OnInit {

  html: string;
  time: number;

  constructor(dialogService: DialogService) {
    super(dialogService);

  }

  ngOnInit() {
    setTimeout(() => {
      this.dismiss();
    }, this.time)
  }

  dismiss() {
    this.result = {
      isClosed: true
    }
    this.close();
  }

}
