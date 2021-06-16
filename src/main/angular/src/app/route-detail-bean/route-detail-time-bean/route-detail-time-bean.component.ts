import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRouteDetailTime } from 'src/app/shared/model/route-detail-time';

@Component({
  selector: 'app-route-detail-time-bean',
  templateUrl: './route-detail-time-bean.component.html',
  styleUrls: ['./route-detail-time-bean.component.scss']
})
export class RouteDetailTimeBeanComponent implements OnInit {

  /** ルート詳細移動 */
  @Input() detail: IRouteDetailTime;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailTimeEvent: EventEmitter<IRouteDetailTime> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailTimeEvent: EventEmitter<number> = new EventEmitter();

  /** ルート詳細メモ情報 フォームグループ */
  routeDetailTimeFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** メモ内容 */
    scheduleDateTime: new FormControl('')
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 入力項目 初期値設定
    if (!this.detail.scheduleDateTime) {
      this.detail.scheduleDateTime = '';
    }

    this.routeDetailTimeFormGroup.patchValue(this.detail);

    // 入力値変更検知
    this.routeDetailTimeFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailTimeFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailTimeEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton(): void {
    this.deleteRouteDetailTimeEvent.emit(this.detail.routeDetailId);
  }

}
