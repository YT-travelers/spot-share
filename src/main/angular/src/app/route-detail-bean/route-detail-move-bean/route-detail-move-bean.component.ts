import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter as _filter } from 'lodash';
import { Code } from 'src/app/shared/const/code-div.const';
import { ICodeList } from 'src/app/shared/model/code-list';
import { IRouteDetailMove } from 'src/app/shared/model/route-detail-move';

@Component({
  selector: 'app-route-detail-move-bean',
  templateUrl: './route-detail-move-bean.component.html',
  styleUrls: ['./route-detail-move-bean.component.scss']
})
export class RouteDetailMoveBeanComponent implements OnInit {

  /** ルート詳細移動 */
  @Input() detail: IRouteDetailMove;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailMoveEvent: EventEmitter<IRouteDetailMove> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailMoveEvent: EventEmitter<number> = new EventEmitter();

  /** 移動手段区分 */
  moveWayDiv = Code.MoveWayDiv;

  /** 移動手段区分リスト */
  moveWayDivList: ICodeList[] = Code.MoveWayDiv.List;

  /** ルート詳細移動情報 フォームグループ */
  routeDetailMoveFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(),
    /** 所要時間 */
    moveMinutes: new FormControl("", [Validators.pattern('^[0-9]*$')]),
    /** 移動手段区分 */
    moveWayDiv: new FormControl(0),
    /** 移動費用 */
    moveCost: new FormControl("", [Validators.pattern('^[0-9]*$')])
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 移動種類区分が未設定の場合は、初期値を設定
    const isInit = _filter(Code.MoveWayDiv.List, e => e.div === this.detail.moveWayDiv).length === 0;
    if (isInit) {
      this.detail.moveWayDiv = Code.MoveWayDiv.List[0].div;
    }

    // 入力項目 初期値設定
    this.routeDetailMoveFormGroup.patchValue(this.detail);
    
    // 入力値変更検知
    this.routeDetailMoveFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailMoveFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailMoveEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailMoveEvent.emit(this.detail.routeDetailId);
  }

}
