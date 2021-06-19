import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectAddSpotModalComponent } from './select-add-spot-modal.component';
import { IRouteDetail } from 'src/app/shared/model/route-detail';

@Injectable({
  providedIn: 'root'
})
export class SelectAddSpotModalService {

  constructor(private modalService: NgbModal) { }

  /**
   * モーダルを表示し、選択されたスポット詳細配列を返却します。
   * キャンセルが押下された場合はnullを返却します。
   */
  show(): Promise<string> {
    // モーダル表示。「xxl」は独自スタイル
    const modalRef = this.modalService.open(SelectAddSpotModalComponent, {'size': 'xxl'});

    return modalRef.result.then((routeDetails: IRouteDetail[]) => {
      // スポット一覧画面で選択されたスポット詳細配列を返却
      return routeDetails;
    }, () => {
      return null;
    });
  }
}
