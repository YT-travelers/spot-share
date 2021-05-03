import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalContent {

  /** コンテントメッセージ */
  @Input() message: string;

  /** true → エラーダイアログ  false → 確認ダイアログ */
  @Input() error: boolean;

  constructor(public activeModal: NgbActiveModal) { }

}
