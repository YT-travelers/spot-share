import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter as _filter } from 'lodash';
import { Code } from 'src/app/const/code-div.const';
import { ICodeList } from 'src/app/model/code-list';
import { IRouteDetailMeal } from 'src/app/model/route-detail-meal';

@Component({
  selector: 'app-route-detail-meal-bean',
  templateUrl: './route-detail-meal-bean.component.html',
  styleUrls: ['./route-detail-meal-bean.component.scss']
})
export class RouteDetailMealBeanComponent implements OnInit {

  /** ルート詳細移動 */
  @Input() detail: IRouteDetailMeal;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailMealEvent: EventEmitter<IRouteDetailMeal> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailMealEvent: EventEmitter<number> = new EventEmitter();

  /** 食事種類区分 */
  mealKindDiv = Code.MealKindDiv;

  /** 食事種類区分リスト */
  mealKindDivList: ICodeList[] = Code.MealKindDiv.List;

  /** ルート詳細食事情報 フォームグループ */
  routeDetailMealFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** 所要時間 */
    mealMinutes: new FormControl(0, [Validators.pattern('^[0-9]*$')]),
    /** 食事種類区分 */
    mealKindDiv: new FormControl(0),
    /** 食事種類区分名称 */
    mealKindDivName: new FormControl(Code.MealKindDiv.List[0].div),
    /** 食事費用 */
    mealCost: new FormControl(0, [Validators.pattern('^[0-9]*$')])
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 食事種類区分が未設定の場合は、初期値を設定
    const isInit = _filter(Code.MealKindDiv.List, e => e.div === this.detail.mealKindDiv).length === 0;
    if (isInit) {
      this.detail.mealKindDiv = Code.MealKindDiv.List[0].div;
    }

    // 入力項目 初期値設定
    this.routeDetailMealFormGroup.patchValue(this.detail);

    // 入力値変更検知
    this.routeDetailMealFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailMealFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailMealEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailMealEvent.emit(this.detail.routeDetailId);
  }

}
