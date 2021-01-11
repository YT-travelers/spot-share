import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRouteDetailChecklist } from '../model/route-detail-checklist';

@Component({
  selector: 'app-route-detail-checklist-bean',
  templateUrl: './route-detail-checklist-bean.component.html',
  styleUrls: ['./route-detail-checklist-bean.component.scss']
})
export class RouteDetailChecklistBeanComponent implements OnInit {

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailChecklistEvent: EventEmitter<string> = new EventEmitter();

  /** 編集対象 */
  routeDetailChecklist: IRouteDetailChecklist = {};

  /** ルート詳細チェックリスト情報 フォームグループ */
  routeDetailChecklistFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** チェック状態 */
    checkStatus: new FormControl(""),
    /** チェック内容 */
    checkContent: new FormControl("")
  });

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {

    // TODO バックから取得した ルート詳細.チェックリスト を代入
    this.routeDetailChecklistFormGroup.patchValue(this.routeDetailChecklist);
    
    this.routeDetailChecklistFormGroup.valueChanges.subscribe(() => {
      this.routeDetailChecklist = this.routeDetailChecklistFormGroup.value;
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailChecklistEvent.emit(this.routeDetailChecklist.routeDetailId);
  }

}
