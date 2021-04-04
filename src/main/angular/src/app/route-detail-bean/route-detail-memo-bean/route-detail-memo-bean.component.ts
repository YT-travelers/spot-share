import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRouteDetailMemo } from '../../model/route-detail-memo';

@Component({
  selector: 'app-route-detail-memo-bean',
  templateUrl: './route-detail-memo-bean.component.html',
  styleUrls: ['./route-detail-memo-bean.component.scss']
})
export class RouteDetailMemoBeanComponent implements OnInit {

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

    // TODO バックから取得した ルート詳細.メモ を代入
    this.routeDetailMemoFormGroup.patchValue(this.routeDetailMemo);
    
    this.routeDetailMemoFormGroup.valueChanges.subscribe(() => {
      this.routeDetailMemo = this.routeDetailMemoFormGroup.value;
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
