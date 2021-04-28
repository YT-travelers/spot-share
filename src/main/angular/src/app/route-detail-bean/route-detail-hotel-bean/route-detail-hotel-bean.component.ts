import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Code } from 'src/app/const/code-div.const';
import { ICodeList } from 'src/app/model/code-list';
import { IRouteDetailHotel } from 'src/app/model/route-detail-hotel';

@Component({
  selector: 'app-route-detail-hotel-bean',
  templateUrl: './route-detail-hotel-bean.component.html',
  styleUrls: ['./route-detail-hotel-bean.component.scss']
})
export class RouteDetailHotelBeanComponent implements OnInit {

  /** ルート詳細ホテル */
  @Input() detail: IRouteDetailHotel;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailHotelEvent: EventEmitter<IRouteDetailHotel> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailHotelEvent: EventEmitter<number> = new EventEmitter();

  /** 食事種類区分 */
  yesNoDiv = Code.YesNoDiv;

  /**食事種類区分リスト */
  yesNoDivList: ICodeList[] = Code.YesNoDiv.List;

  /** ルート詳細ホテル フォームグループ */
  routeDetailHotelFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** 滞在時間 */
    hotelCost: new FormControl(0, [Validators.pattern('^[0-9]*$')]),
    /** 朝食有無区分 */
    hotelBreakfastYesNoDiv: new FormControl(0),
    /** 夕食有無区分 */
    hotelDinnerYesNoDiv: new FormControl(0),
    /** 宿泊費用 */
    hotelMinutes: new FormControl(0, [Validators.pattern('^[0-9]*$')])
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 入力項目 初期値設定
    this.routeDetailHotelFormGroup.patchValue(this.detail);
    
    // 入力値変更検知
    this.routeDetailHotelFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailHotelFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailHotelEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailHotelEvent.emit(this.detail.routeDetailId);
  }

}
