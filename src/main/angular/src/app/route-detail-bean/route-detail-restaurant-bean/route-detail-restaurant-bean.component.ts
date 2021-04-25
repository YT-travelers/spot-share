import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Code } from 'src/app/const/code-div.const';
import { ICodeList } from 'src/app/model/code-list';
import { IRouteDetailRestaurant } from '../../model/route-detail-restaurant';

@Component({
  selector: 'app-route-detail-restaurant-bean',
  templateUrl: './route-detail-restaurant-bean.component.html',
  styleUrls: ['./route-detail-restaurant-bean.component.scss']
})
export class RouteDetailRestaurantBeanComponent implements OnInit {

  /** ルート詳細飲食店 */
  @Input() detail: IRouteDetailRestaurant;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailRestaurantEvent: EventEmitter<IRouteDetailRestaurant> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailRestaurantEvent: EventEmitter<number> = new EventEmitter();

  /** 食事種類区分 */
  mealKindDiv = Code.MealKindDiv;

  /**食事種類区分リスト */
  mealKindDivList: ICodeList[] = Code.MealKindDiv.List;

  /** ルート詳細飲食店 フォームグループ */
  routeDetailRestaurantFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** 所要時間 */
    moveMinutes: new FormControl(0, [Validators.pattern('^[0-9]*$')]),
    /** 食事種類区分 */
    mealKindDiv: new FormControl(0),
    /** 飲食費用 */
    restaurantCost: new FormControl(0, [Validators.pattern('^[0-9]*$')])
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 入力項目 初期値設定
    this.routeDetailRestaurantFormGroup.patchValue(this.detail);
    
    // 入力値変更検知
    this.routeDetailRestaurantFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailRestaurantFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailRestaurantEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailRestaurantEvent.emit(this.detail.routeDetailId);
  }

}
