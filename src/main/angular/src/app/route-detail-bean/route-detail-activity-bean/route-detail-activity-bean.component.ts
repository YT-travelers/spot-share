import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRouteDetailActivity } from 'src/app/model/route-detail-activity';

@Component({
  selector: 'app-route-detail-activity-bean',
  templateUrl: './route-detail-activity-bean.component.html',
  styleUrls: ['./route-detail-activity-bean.component.scss']
})
export class RouteDetailActivityBeanComponent implements OnInit {

  /** ルート詳細アクティビティ */
  @Input() detail: IRouteDetailActivity;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailActivityEvent: EventEmitter<IRouteDetailActivity> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailActivityEvent: EventEmitter<number> = new EventEmitter();

  /** ルート詳細アクティビティ フォームグループ */
  routeDetailActivityFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** アクティビティ時間 */
    activityMinutes: new FormControl(0, [Validators.pattern('^[0-9]*$')]),
    /** アクティビティ費用 */
    activityCost: new FormControl(0, [Validators.pattern('^[0-9]*$')])
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 入力項目 初期値設定
    this.routeDetailActivityFormGroup.patchValue(this.detail);
    
    // 入力値変更検知
    this.routeDetailActivityFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailActivityFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailActivityEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailActivityEvent.emit(this.detail.routeDetailId);
  }

}
