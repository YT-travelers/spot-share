import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IRouteDetailTourism } from 'src/app/model/route-detail-tourism';

@Component({
  selector: 'app-route-detail-tourism-bean',
  templateUrl: './route-detail-tourism-bean.component.html',
  styleUrls: ['./route-detail-tourism-bean.component.scss']
})
export class RouteDetailTourismBeanComponent {

  /** ルート詳細観光地 */
  @Input() detail: IRouteDetailTourism;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailTourismEvent: EventEmitter<IRouteDetailTourism> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailTourismEvent: EventEmitter<number> = new EventEmitter();

  /**
   * Input値変更検知
   */
  ngOnChanges() {
    this.updateRouteDetailTourismEvent.emit(this.detail);
  }

  /**
   * 観光地ビーン削除ボタン押下イベント
   */
  onClickDeleteTourismButton() {
    this.deleteRouteDetailTourismEvent.emit(this.detail.routeDetailId);
  }

}
