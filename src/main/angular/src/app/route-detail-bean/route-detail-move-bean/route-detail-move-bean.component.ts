import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRouteDetailMove } from '../../model/route-detail-move';

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
  MoveWayDivList = [
    { MoveWayDiv: 0, MoveWayDivName: '徒歩'},
    { MoveWayDiv: 1, MoveWayDivName: '自転車'},
    { MoveWayDiv: 2, MoveWayDivName: 'バイク'},
    { MoveWayDiv: 3, MoveWayDivName: '車'},
    { MoveWayDiv: 4, MoveWayDivName: 'タクシー'},
    { MoveWayDiv: 5, MoveWayDivName: 'バス'},
    { MoveWayDiv: 6, MoveWayDivName: '電車'},
    { MoveWayDiv: 7, MoveWayDivName: '寝台列車'},
    { MoveWayDiv: 8, MoveWayDivName: '新幹線'},
    { MoveWayDiv: 9, MoveWayDivName: '飛行機'},
    { MoveWayDiv: 10, MoveWayDivName: '船'},
    { MoveWayDiv: 11, MoveWayDivName: 'フェリー'},
    { MoveWayDiv: 12, MoveWayDivName: 'その他'},
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
    moveWayDiv: new FormControl(0),
    /** 移動手段区分名称 */
    moveWayDivName: new FormControl(this.MoveWayDivList[0].MoveWayDivName),
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
