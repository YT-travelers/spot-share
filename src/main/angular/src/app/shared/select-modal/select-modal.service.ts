import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectModalContent } from './select-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SelectModalService {

  constructor(private modalService: NgbModal) { }

  /**
   * モーダルを表示します。
   * @param message コンテントメッセージ
   * @param confirmDialog true → エラーダイアログ  false → 確認ダイアログ  
   */
  show(message: string, error?: boolean): Promise<boolean> {
    const modalRef = this.modalService.open(SelectModalContent);
    const component = modalRef.componentInstance as SelectModalContent;
    if (component != null) {
      component.message = message;
      component.error = error;
    }

    return modalRef.result.then(() => {
      // OK
      return true;
    }, () => {
      // キャンセル
      return false;
    });
  }
}