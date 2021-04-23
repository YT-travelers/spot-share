import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRouteDetailMemo } from '../../model/route-detail-memo';

@Component({
  selector: 'app-route-detail-memo-bean',
  templateUrl: './route-detail-memo-bean.component.html',
  styleUrls: ['./route-detail-memo-bean.component.scss']
})
export class RouteDetailMemoBeanComponent implements OnInit {

  /** ルート詳細移動 */
  @Input() detail: IRouteDetailMemo;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailMemoEvent: EventEmitter<IRouteDetailMemo> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailMemoEvent: EventEmitter<string> = new EventEmitter();

  /** 編集対象 */
  routeDetailMemo: IRouteDetailMemo = {};

  /** ルート詳細メモ情報 フォームグループ */
  routeDetailMemoFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** メモ内容 */
    memoContent: new FormControl("")
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 入力項目 初期値設定
    this.routeDetailMemoFormGroup.patchValue(this.routeDetailMemo);

    // 入力値変更検知
    this.routeDetailMemoFormGroup.valueChanges.subscribe(() => {
      this.routeDetailMemo = this.routeDetailMemoFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailMemoEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailMemoEvent.emit(this.routeDetailMemo.routeDetailId);
  }

}
