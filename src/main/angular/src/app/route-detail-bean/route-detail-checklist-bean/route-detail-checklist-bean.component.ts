import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter as _filter } from 'lodash'
import { Code } from 'src/app/shared/const/code-div.const';
import { IRouteDetailChecklist } from 'src/app/model/route-detail-checklist';

@Component({
  selector: 'app-route-detail-checklist-bean',
  templateUrl: './route-detail-checklist-bean.component.html',
  styleUrls: ['./route-detail-checklist-bean.component.scss']
})
export class RouteDetailChecklistBeanComponent implements OnInit {

  @ViewChild('checkbox') private checkbox: ElementRef;

  /** ルート詳細移動 */
  @Input() detail: IRouteDetailChecklist;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailChecklistEvent: EventEmitter<IRouteDetailChecklist> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailChecklistEvent: EventEmitter<number> = new EventEmitter();

  /** チェックボックスのスタイルを定数化 */
  WHITE = 'white';
  LIME_GREEN = 'limegreen'

  /** ルート詳細チェックリスト情報 フォームグループ */
  routeDetailChecklistFormGroup = new FormGroup({
    /** ルート詳細ID */
    routeDetailId: new FormControl(0),
    /** チェック状態 */
    checkStatus: new FormControl(""),
    /** チェック内容 */
    checkContent: new FormControl("")
  });

  constructor(private renderer: Renderer2){
  }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // チェック状態が未設定の場合は、初期値を設定
    const isInit = _filter(Code.CheckDiv.List, e => e.div === this.detail.checkStatus).length === 0;
    if (isInit) {
      this.detail.checkStatus = Code.CheckDiv.UnCheckd;
      this.detail.checkContent = "";
    }

    // 入力項目 初期値設定
    this.routeDetailChecklistFormGroup.patchValue(this.detail);
    
    this.routeDetailChecklistFormGroup.valueChanges.subscribe(() => {
      this.detail = this.routeDetailChecklistFormGroup.value;

      /** ルート詳細更新イベント通知 */
      this.updateRouteDetailChecklistEvent.emit(this.detail);
    });
  }

  ngAfterViewInit() {
    // チェックボックスの状態（表示）を初期化 ※scssによりデフォルトはチェック状態のスタイルが適用されている
    if (this.detail.checkStatus === Code.CheckDiv.UnCheckd) {
      this.renderer.setStyle(this.checkbox.nativeElement, 'color', this.WHITE);
    }
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * チェックボックス切り替えイベント
   */
  onClickCheckbox() {
    // チェック状態を反転させる
    if (Code.CheckDiv.UnCheckd === this.routeDetailChecklistFormGroup.value.checkStatus) {
      this.routeDetailChecklistFormGroup.controls.checkStatus.setValue(Code.CheckDiv.Checked);
      this.renderer.setStyle(this.checkbox.nativeElement, 'color', this.LIME_GREEN);

    } else {
      this.routeDetailChecklistFormGroup.controls.checkStatus.setValue(Code.CheckDiv.UnCheckd);
      this.renderer.setStyle(this.checkbox.nativeElement, 'color', this.WHITE);
    }
  }

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton() {
    this.deleteRouteDetailChecklistEvent.emit(this.detail.routeDetailId);
  }

}
