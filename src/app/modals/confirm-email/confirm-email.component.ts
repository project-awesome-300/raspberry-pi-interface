import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { OpenEmailModal, CloseEmailModal } from '../../../models/modals.model';
import * as i18next from 'i18next';

@Component({
  selector: 'confirm',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})

export class ConfirmEmailComponent extends DialogComponent<OpenEmailModal, CloseEmailModal> implements OnInit {

  @ViewChild('emailField') el: ElementRef;

  //these variavbles are implied from the parent dialog component
  title: string;
  message: string;
  email: string;
  emailText: string;


  constructor(dialogService: DialogService) {
    super(dialogService);
    this.emailText = i18next.t("email");
  }


  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
  confirm() {
    this.result = {
      email: this.email,
      submit: true
    }
    this.close();
  }

  dismiss() {
    this.result = {
      email: "",
      submit: false
    }
    this.close();
  }


}
