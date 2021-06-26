import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

import { Const } from 'src/app/shared/const/const.const';
import { TimeUtils } from 'src/app/shared/utils/time-utils.const';
import { Code } from 'src/app/shared/const/code-div.const';
import { ICodeList } from 'src/app/shared/model/code-list';
import { IRouteDetailHotel } from 'src/app/shared/model/route-detail-hotel';

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

  /** 食事種類区分リスト */
  yesNoDivList: ICodeList[] = Code.YesNoDiv.List;

  /** ルート詳細ホテル フォームグループ */
  routeDetailHotelFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(),
    /** ホテルID */
    hotelId: new FormControl(),
    /** ホテル */
    hotel: new FormGroup({
      /** ホテル名称 */
      hotelName: new FormControl()
    }),
    /** 行きたい度 */
    hotelRate: new FormControl(0),
    /** 滞在時間 */
    hotelMinutes: new FormControl(0, [Validators.pattern(Const.RegularExpr.HalfNumber)]),
    /** チェックイン時間（時） */
    hotelCheckInTimeHours: new FormControl(0, [Validators.pattern(Const.RegularExpr.HalfNumber)]),
    /** チェックイン時間（分） */
    hotelCheckInTimeMinutes: new FormControl(0, [Validators.pattern(Const.RegularExpr.HalfNumber)]),
    /** チェックアウト時間（時） */
    hotelCheckOutTimeHours: new FormControl(0, [Validators.pattern(Const.RegularExpr.HalfNumber)]),
    /** チェックアウト時間（分） */
    hotelCheckOutTimeMinutes: new FormControl(0, [Validators.pattern(Const.RegularExpr.HalfNumber)]),
    /** 朝食有無区分 */
    hotelBreakfastYesNoDiv: new FormControl(0),
    /** 夕食有無区分 */
    hotelDinnerYesNoDiv: new FormControl(0),
    /** 宿泊費用 */
    hotelCost: new FormControl(0, [Validators.pattern(Const.RegularExpr.HalfNumber)])
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 入力項目 初期値設定
    this.routeDetailHotelFormGroup.patchValue(this.detail);

    // 入力値変更検知
    this.routeDetailHotelFormGroup.valueChanges.pipe(
      debounceTime(400),
      map(() => {
        // チェックイン時間（時）を補完
        const checkInTimeHours = TimeUtils.complementHour(this.routeDetailHotelFormGroup.value.hotelCheckInTimeHours);
        if (checkInTimeHours !== this.routeDetailHotelFormGroup.value.hotelCheckInTimeHours) {
          this.routeDetailHotelFormGroup.controls.hotelCheckInTimeHours.setValue(checkInTimeHours);
        }

        // チェックイン時間（分）を補完
        const checkInTimeMinutes = TimeUtils.complementMinutes(this.routeDetailHotelFormGroup.value.hotelCheckInTimeMinutes);
        if (checkInTimeMinutes !== this.routeDetailHotelFormGroup.value.hotelCheckInTimeMinutes) {
          this.routeDetailHotelFormGroup.controls.hotelCheckInTimeMinutes.setValue(checkInTimeMinutes);
        }

        // チェックアウト時間（時）を補完
        const checkOutTimeHours = TimeUtils.complementHour(this.routeDetailHotelFormGroup.value.hotelCheckOutTimeHours);
        if (checkOutTimeHours !== this.routeDetailHotelFormGroup.value.hotelCheckOutTimeHours) {
          this.routeDetailHotelFormGroup.controls.hotelCheckOutTimeHours.setValue(checkOutTimeHours);
        }

        // チェックアウト時間（分）を補完
        const checkOutTimeMinutes = TimeUtils.complementMinutes(this.routeDetailHotelFormGroup.value.hotelCheckOutTimeMinutes);
        if (checkOutTimeMinutes !== this.routeDetailHotelFormGroup.value.hotelCheckOutTimeMinutes) {
          this.routeDetailHotelFormGroup.controls.hotelCheckOutTimeMinutes.setValue(checkOutTimeMinutes);
        }

      }))
      .subscribe(() => {
        this.detail = this.routeDetailHotelFormGroup.value;
        /** ルート詳細更新イベント通知 */
        this.updateRouteDetailHotelEvent.emit(this.detail);
      }
    );
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton(): void {
    this.deleteRouteDetailHotelEvent.emit(this.detail.routeDetailId);
  }

}
