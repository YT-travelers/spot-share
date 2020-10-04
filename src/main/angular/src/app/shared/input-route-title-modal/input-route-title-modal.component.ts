import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'input-route-title-modal',
  templateUrl: './input-route-title-modal.component.html',
  styleUrls: ['./input-route-title-modal.component.scss']
})
export class InputRouteTitleModalContent {

  constructor(public activeModal: NgbActiveModal) { }

}
