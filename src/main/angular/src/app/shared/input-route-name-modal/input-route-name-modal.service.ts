import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputRouteNameModalContent } from './input-route-name-modal.component';

@Injectable({
  providedIn: 'root'
})
export class InputRouteNameModalService {

  constructor(private modalService: NgbModal) { }

  /**
   * モーダルを表示し、入力されたルート名を返却します。
   * キャンセルが押下された場合はnullを返却します。
   */
  show(): Promise<string> {
    const modalRef = this.modalService.open(InputRouteNameModalContent);

    return modalRef.result.then(routeName => {
      return routeName;
    }, () => {
      return null;
    });
  }
}