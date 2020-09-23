import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'common-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalContent {

  /** コンテントメッセージ */
  @Input() message: string;

  /** true → エラーダイアログ  false → 確認ダイアログ */
  @Input() error: boolean;

  constructor(public activeModal: NgbActiveModal) { }

}
