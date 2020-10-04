import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputRouteTitleModalContent } from './input-route-title-modal.component';

@Injectable({
  providedIn: 'root'
})
export class InputRouteTitleModalService {

  constructor(private modalService: NgbModal) { }

  /**
   * モーダルを表示します。
   */
  show(): Promise<boolean> {
    const modalRef = this.modalService.open(InputRouteTitleModalContent);

    // TODO ルートのタイトル（入力値）を返却
    return modalRef.result.then(() => {
      // OK
      return true;
    }, () => {
      // キャンセル
      return false;
    });
  }
}