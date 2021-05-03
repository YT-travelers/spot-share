import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Code } from 'src/app/shared/const/code-div.const';
import { ICodeList } from 'src/app/shared/model/code-list';
import { Const } from 'src/app/shared/const/const.const';
import { NumberUtils } from 'src/app/shared/utils/number-utils.const';
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

  /**食事種類区分リスト */
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
        const checkInTimeHours = this.complementHour(this.routeDetailHotelFormGroup.value.hotelCheckInTimeHours);
        if (checkInTimeHours !== this.routeDetailHotelFormGroup.value.hotelCheckInTimeHours) {
          this.routeDetailHotelFormGroup.controls.hotelCheckInTimeHours.setValue(checkInTimeHours);  
        }
        
        // チェックイン時間（分）を補完
        const checkInTimeMinutes = this.complementMinutes(this.routeDetailHotelFormGroup.value.hotelCheckInTimeMinutes);
        if (checkInTimeMinutes !== this.routeDetailHotelFormGroup.value.hotelCheckInTimeMinutes) {
          this.routeDetailHotelFormGroup.controls.hotelCheckInTimeMinutes.setValue(checkInTimeMinutes);
        }

        // チェックアウト時間（時）を補完
        const checkOutTimeHours = this.complementHour(this.routeDetailHotelFormGroup.value.hotelCheckOutTimeHours);
        if (checkOutTimeHours !== this.routeDetailHotelFormGroup.value.hotelCheckOutTimeHours) {
          this.routeDetailHotelFormGroup.controls.hotelCheckOutTimeHours.setValue(checkOutTimeHours);
        }
        
        // チェックアウト時間（分）を補完
        const checkOutTimeMinutes = this.complementMinutes(this.routeDetailHotelFormGroup.value.hotelCheckOutTimeMinutes);
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
  onClickDeleteButton() {
    this.deleteRouteDetailHotelEvent.emit(this.detail.routeDetailId);
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 「時間」の入力値を補完します。
   * ・数字以外の場合、"0"を返却
   * ・全角の場合、半角に変換
   * ・23より大きい数字の場合は、23に変換
   */
  private complementHour(value: string) {
    // 「数字」以外の場合、"0"を返却
    const match = new RegExp(Const.RegularExpr.HalfNumber)
    if (!match.test(value)) {
      return "0";
    }
    // 全角数字を半角数字に変換
    value = NumberUtils.convNumberFulltoHalf(value);

    // 23(時)より高い値の場合は 23(時)に変換
    const maxMinutes = 23;
    if (Number(value) > maxMinutes ) {
      return maxMinutes.toString();
    } else {
      return value;
    }
  }

    /**
   * 「分」の入力値を補完します。
   * ・数字以外の場合、"0"を返却
   * ・全角の場合、半角に変換
   * ・59より大きい数字の場合は、59に変換
   * @param value 入力値（分）
   * @returns 変換後の値
   */
    private complementMinutes(value: string) {
    // 「数字」以外の場合、"0"を返却
    const match = new RegExp(Const.RegularExpr.HalfNumber)
    if (!match.test(value)) {
      return "0";
    }

    // 全角数字を半角数字に変換
    value = NumberUtils.convNumberFulltoHalf(value);

    // 59(分)より高い値の場合は 59(分)に変換
    const maxMinutes = 59;
    if (Number(value) > maxMinutes ) {
      return maxMinutes.toString();
    } else {
      return value;
    }
  }

}
