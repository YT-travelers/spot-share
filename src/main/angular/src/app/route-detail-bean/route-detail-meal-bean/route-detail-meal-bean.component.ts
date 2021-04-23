import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICodeList } from 'src/app/model/code-list';
import { Code } from '../../const/code-div.const';
import { IRouteDetailMeal } from '../../model/route-detail-meal';

@Component({
  selector: 'app-route-detail-meal-bean',
  templateUrl: './route-detail-meal-bean.component.html',
  styleUrls: ['./route-detail-meal-bean.component.scss']
})
export class RouteDetailMealBeanComponent implements OnInit {

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailMealEvent: EventEmitter<string> = new EventEmitter();

  /** 食事種類区分 */
  mealKindDiv = Code.MealKindDiv;

  /** 食事種類区分リスト */
  mealKindDivList: ICodeList[] = Code.MealKindDiv.List;

  /** 編集対象 */
  routeDetailMeal: IRouteDetailMeal = {};

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
    // TODO バックから取得した ルート詳細.食事 を代入
    this.routeDetailMealFormGroup.patchValue(this.routeDetailMeal);
    
    this.routeDetailMealFormGroup.valueChanges.subscribe(() => {
      this.routeDetailMeal = this.routeDetailMealFormGroup.value;
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailMealEvent.emit(this.routeDetailMeal.routeDetailId);
  }

}
