import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRouteDetailMove } from '../model/route-detail-move';

@Component({
  selector: 'app-route-detail-move-bean',
  templateUrl: './route-detail-move-bean.component.html',
  styleUrls: ['./route-detail-move-bean.component.scss']
})
export class RouteDetailMoveBeanComponent implements OnInit {

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailMoveEvent: EventEmitter<string> = new EventEmitter();

  /** 移動手段リスト */
  // TODO バックエンドから取得する 
  moveKindDivList = [
    { moveKindDiv: 0, moveKindDivName: '徒歩'},
    { moveKindDiv: 1, moveKindDivName: '自転車'},
    { moveKindDiv: 2, moveKindDivName: 'バイク'},
    { moveKindDiv: 3, moveKindDivName: '車'},
    { moveKindDiv: 4, moveKindDivName: 'タクシー'},
    { moveKindDiv: 5, moveKindDivName: 'バス'},
    { moveKindDiv: 6, moveKindDivName: '電車'},
    { moveKindDiv: 7, moveKindDivName: '寝台列車'},
    { moveKindDiv: 8, moveKindDivName: '新幹線'},
    { moveKindDiv: 9, moveKindDivName: '飛行機'},
    { moveKindDiv: 10, moveKindDivName: '船'},
    { moveKindDiv: 11, moveKindDivName: 'フェリー'},
    { moveKindDiv: 12, moveKindDivName: 'その他'},
  ];

  /** 編集対象 */
  routeDetailMove: IRouteDetailMove = {};

  /** ルート詳細移動情報 フォームグループ */
  routeDetailMoveFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** 所要時間 */
    moveMinutes: new FormControl(0, [Validators.pattern('^[0-9]*$')]),
    /** 移動手段区分 */
    moveKindDiv: new FormControl(0),
    /** 移動手段区分名称 */
    moveKindDivname: new FormControl(this.moveKindDivList[0].moveKindDivName),
    /** 移動費用 */
    moveCost: new FormControl(0, [Validators.pattern('^[0-9]*$')])
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // TODO 移動手段区分の取得

    // TODO バックから取得した ルート詳細.移動 を代入
    this.routeDetailMoveFormGroup.patchValue(this.routeDetailMove);
    
    this.routeDetailMoveFormGroup.valueChanges.subscribe(() => {
      this.routeDetailMove = this.routeDetailMoveFormGroup.value;
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailMoveEvent.emit(this.routeDetailMove.routeDetailId);
  }

}
