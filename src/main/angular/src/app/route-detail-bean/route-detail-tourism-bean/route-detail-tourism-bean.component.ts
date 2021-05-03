import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Const } from 'src/app/shared/const/const.const';
import { IRouteDetailTourism } from 'src/app/model/route-detail-tourism';

@Component({
  selector: 'app-route-detail-tourism-bean',
  templateUrl: './route-detail-tourism-bean.component.html',
  styleUrls: ['./route-detail-tourism-bean.component.scss']
})
export class RouteDetailTourismBeanComponent {

  /** ルート詳細観光地 */
  @Input() detail: IRouteDetailTourism;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailTourismEvent: EventEmitter<IRouteDetailTourism> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailTourismEvent: EventEmitter<number> = new EventEmitter();

  /** ルート詳細観光地 フォームグループ */
  routeDetailTourismFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** 観光地ID */
    tourismId: new FormControl(0),
    /** 観光地 */
    tourism: new FormGroup({
      /** 観光地名称 */
      tourismName: new FormControl(),
      /** 営業開始時間（時） */
      tourismOpenTimeHours: new FormControl(),
      /** 営業開始時間（分） */
      tourismOpenTimeMinutes: new FormControl(),
      /** 営業終了時間（時） */
      tourismCloseTimeHours: new FormControl(),
      /** 営業終了時間（分） */
      tourismCloseTimeMinutes: new FormControl(),
    }),
    /** 行きたい度 */
    tourismRate: new FormControl(0),
    /** 観光時間 */
    tourismMinutes: new FormControl(0, [Validators.pattern(Const.RegularExpr.HalfNumber)]),
    /** 観光費用 */
    tourismCost: new FormControl(0, [Validators.pattern(Const.RegularExpr.HalfNumber)])
  });

  // -----------------------------------------------------------------------
  // ライフサイクル
  ngOnInit(): void {
    // 入力項目 初期値設定
    this.routeDetailTourismFormGroup.patchValue(this.detail);
    
    // 入力値変更検知
    this.routeDetailTourismFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailTourismFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailTourismEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 観光地ビーン削除ボタン押下イベント
   */
   onClickDeleteButton() {
    this.deleteRouteDetailTourismEvent.emit(this.detail.routeDetailId);
  }

}
