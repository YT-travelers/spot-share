import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'input-route-name-modal',
  templateUrl: './input-route-name-modal.component.html',
  styleUrls: ['./input-route-name-modal.component.scss']
})
export class InputRouteNameModalContent {

  /** ルートタイトル */
  routeName = '';

  constructor(public activeModal: NgbActiveModal) { }

  /**
   * OKボタン押下イベント
   */
  onClickDone() {
    this.activeModal.close(this.routeName);
  }

}
