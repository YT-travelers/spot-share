import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRouteDetailChecklist } from 'src/app/model/route-detail-checklist';

@Component({
  selector: 'app-route-detail-checklist-bean',
  templateUrl: './route-detail-checklist-bean.component.html',
  styleUrls: ['./route-detail-checklist-bean.component.scss']
})
export class RouteDetailChecklistBeanComponent implements OnInit {

  /** ルート詳細移動 */
  @Input() detail: IRouteDetailChecklist;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailChecklistEvent: EventEmitter<IRouteDetailChecklist> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailChecklistEvent: EventEmitter<number> = new EventEmitter();

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
    this.routeDetailChecklistFormGroup.patchValue(this.detail);
    
    this.routeDetailChecklistFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailChecklistFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailChecklistEvent.emit(this.detail);
    });
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailChecklistEvent.emit(this.detail.routeDetailId);
  }

}
