import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowSpotPageComponent } from 'src/app/show-spot-page/show-spot-page.component';
import { IRouteDetail } from 'src/app/shared/model/route-detail';

@Component({
  selector: 'app-select-add-spot-modal',
  templateUrl: './select-add-spot-modal.component.html',
  styleUrls: ['./select-add-spot-modal.component.scss']
})
export class SelectAddSpotModalComponent {
  
  @ViewChild ('showSpotPageComponent') showSpotPageComponent: ShowSpotPageComponent;

  constructor(public activeModal: NgbActiveModal) { }

  /**
   * 追加ボタン押下イベント
   */
  onClickDone(): void {
    const routeDetails: IRouteDetail[] = this.showSpotPageComponent.getSelectSpot();
    if (routeDetails.length === 0) {
      // チェックボックスが一つも選択されていない場合、何もしない（スポット一覧側でエラーが表示される）
    } else {
      // モーダルを閉じる
      this.activeModal.close(routeDetails);
    }
    
  }

}
