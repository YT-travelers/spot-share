import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Code } from 'src/app/const/code-div.const';
import { ICodeList } from 'src/app/model/code-list';
import { IRouteDetailActivity } from 'src/app/model/route-detail-activity';

@Component({
  selector: 'app-route-detail-activity-bean',
  templateUrl: './route-detail-activity-bean.component.html',
  styleUrls: ['./route-detail-activity-bean.component.scss']
})
export class RouteDetailActivityBeanComponent implements OnInit {

  /** ルート詳細飲食店 */
  @Input() detail: IRouteDetailActivity;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailActivityEvent: EventEmitter<IRouteDetailActivity> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailActivityEvent: EventEmitter<number> = new EventEmitter();

  /** 食事種類区分 */
  mealKindDiv = Code.MealKindDiv;

  /**食事種類区分リスト */
  mealKindDivList: ICodeList[] = Code.MealKindDiv.List;

  /** ルート詳細飲食店 フォームグループ */
  routeDetailActivityFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** 飲食時間 */
    activityMinutes: new FormControl(0, [Validators.pattern('^[0-9]*$')]),
    /** 食事種類区分 */
    mealKindDiv: new FormControl(0),
    /** 飲食費用 */
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
