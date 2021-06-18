import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { defer as _defer } from 'lodash';
import { Const } from 'src/app/shared/const/const.const';
import { IRouteDetailTime } from 'src/app/shared/model/route-detail-time';
import { TimeUtils } from 'src/app/shared/utils/time-utils.const';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-route-detail-time-bean',
  templateUrl: './route-detail-time-bean.component.html',
  styleUrls: ['./route-detail-time-bean.component.scss']
})
export class RouteDetailTimeBeanComponent implements OnInit {

  /** ルート詳細時間 */
  @Input() detail: IRouteDetailTime;

  /** ルート詳細更新イベント通知 */
  @Output() updateRouteDetailTimeEvent: EventEmitter<IRouteDetailTime> = new EventEmitter();

  /** ビーン削除イベント通知 */
  @Output() deleteRouteDetailTimeEvent: EventEmitter<number> = new EventEmitter();

  /** 画面編集用 */
  scheduleDateTime = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minutes: 0,
  };

  constructor(
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 入力項目 初期値設定
    let dateTime;
    if (this.detail.scheduleDateTime) {
      // utcで受け取らないと、アクセス元のブラウザの時差分ずれる
      dateTime = moment.utc(this.detail.scheduleDateTime).format(Const.DateTimeFormat.Hyphen);
    } else {
      // 1.初期値設定の場合はブラウザ依存の時刻を設定すればよいため、utcにはしない
      // 2.momentでシステム日時を取得した場合、0数えで前月が表示されるためプラス1月して調整する
      dateTime = moment().add(1, 'month');
    }

    this.scheduleDateTime.year = moment(dateTime).year();
    this.scheduleDateTime.month = moment(dateTime).month();
    this.scheduleDateTime.day = moment(dateTime).date();
    this.scheduleDateTime.hour = moment(dateTime).hour();
    this.scheduleDateTime.minutes = moment(dateTime).minutes();

    // 設定した初期値を変更イベントとして通知する
    this.emitChangeEvent();

  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 時間変更イベント
   * @param event 
   */
  onChangeHours(event) {
    this.scheduleDateTime.hour = Number(TimeUtils.complementHour(event));
    this.emitChangeEvent();
  }

  /**
   * 分変更イベント
   * @param event 
   */
  onChangeMinutes(event) {
    this.scheduleDateTime.minutes = Number(TimeUtils.complementMinutes(event));
    this.emitChangeEvent();
  }

  /**
   * カレンダー日付選択イベント（ngbDatepicker）
   * @param event 
   */
  onDateSelection(event: NgbDateStruct) {
    this.scheduleDateTime.year = event.year;
    this.scheduleDateTime.month = event.month;
    this.scheduleDateTime.day = event.day;
    this.emitChangeEvent();
  }

  /**
   * 削除ボタン押下イベント
   */
  onClickDeleteButton(): void {
    this.deleteRouteDetailTimeEvent.emit(this.detail.routeDetailId);
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * スケジュール日時変更イベント通知
   */
   emitChangeEvent() {
    const routeDetailTime: IRouteDetailTime = {
      routeDetailId: this.detail.routeDetailId,
      scheduleDateTime: moment(this.scheduleDateTime).format(Const.DateTimeFormat.Hyphen),
    }

    this.updateRouteDetailTimeEvent.emit(routeDetailTime);
   }

  // -----------------------------------------------------------------------
  // getter

  /** 編集対象の日付文字列を画面表示用に変換 */
  get dispScheduleDateTime(): string {
    // bootstrapのngbDatepickerが月を0数えしているせいか、引数の次月が表示されてしまうため内部的にマイナス1月をして表示を調整する
    const date = moment.utc(this.scheduleDateTime).subtract(1, 'month');
    return date.format(Const.DateTimeFormat.SlashMonthDay);
  }

}
