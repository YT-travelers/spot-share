import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IRouteDetailTourism } from '../../model/route-detail-tourism';

@Component({
  selector: 'app-route-detail-tourism-bean',
  templateUrl: './route-detail-tourism-bean.component.html',
  styleUrls: ['./route-detail-tourism-bean.component.scss']
})
export class RouteDetailTourismBeanComponent {

  /** ルート詳細観光地 */
  @Input() detail: IRouteDetailTourism;

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailTourismEvent: EventEmitter<string> = new EventEmitter();

  onClickDeleteTourismButton() {
    this.deleteRouteDetailTourismEvent.emit(this.detail.routeDetailId);
  }

}
