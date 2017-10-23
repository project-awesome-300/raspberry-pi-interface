import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { OpenEmailModal, CloseEmailModal } from '../../models/photo-email.model';



@Component({
  selector: 'confirm',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent extends DialogComponent<OpenEmailModal, CloseEmailModal> implements OnInit {

  //these variavbles are implied from the parent dialog component
  title: string;
  message: string;
  private _webAddress: string;
  private _email: string;

  constructor(dialogService: DialogService) {
    super(dialogService);

  }

  ngOnInit(): void {
  }
  confirm() {
    this.result = {
      email: this._email,
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
