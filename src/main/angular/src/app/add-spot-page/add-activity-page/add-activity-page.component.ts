import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter as _filter } from 'lodash';

import { IActivity } from 'src/app/model/activity';
import { ActivityService } from 'src/app/shared/service/activity.service';

// アクティビティ編集モード列挙値
export enum EditMode {
  // 新規モード（URL例：add-activity-page）
  new,
  // 編集モード（URL例：add-activity-page;id=1）
  edit,
  // ルート作成モード
  routeCreate,
}

@Component({
  selector: 'app-add-activity-page',
  templateUrl: './add-activity-page.component.html',
  styleUrls: ['./add-activity-page.component.scss']
})
export class AddActivityPageComponent implements OnInit {

  /** ルート作成画面で選択されたアクティビティ情報が格納される */
  @Input() selectedActivity: IActivity;

  /** アクティビティ編集モード */
  editMode

  /** アクティビティ編集モード（HTML用） */
  EditMode = EditMode;

  /** 編集対象 */
  activity: IActivity = {};

  /** 画面上に表示するアクティビティ情報のID */
  activityId = '';

  /** 画像タイトル */
  imageTitle = '';

  /** 連続作成フラグ */
  continueCreateFlg = true;

  /** 正規表現　全角数字 or 半角数字のみ */
  patternNumber = /[0-9０-９]/;

  /** アクティビティ情報 フォームグループ */
  addActivityFormGroup = new FormGroup({
    /** アクティビティID */
    activityId: new FormControl(this.activity.activityId),
    /**  アクティビティ名称 */
    activityName: new FormControl(this.activity.activityName, [Validators.required]),
    /** 住所 */
    activityAddress: new FormControl(this.activity.activityAddress, [Validators.pattern('^[0-9]*$')]),
    /** url */
    activityUrl: new FormControl(this.activity.activityUrl),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ActivityService,
    private toastr: ToastrService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit() {

    // アクティビティ編集モードの判定
    this.activityId = this.route.snapshot.paramMap.get('activityId');
    if (this.activityId) {
      // 既存アクティビティ編集モード
      this.editMode = EditMode.edit;
      this.service.getActivity(this.activityId).subscribe(result => {
        if (result) {
          this.activity = result;
          this.addActivityFormGroup.patchValue(this.activity);
        } else {
          // IDによるGET処理に失敗した場合は、新規モードで画面を開く
          this.editMode = EditMode.new;
        }
      }, () => {
        // IDによるGET処理に失敗した場合は、新規モードで画面を開く
        this.editMode = EditMode.new;
      });

    } else if (this.selectedActivity) {
      // ルート作成モード
      this.editMode = EditMode.routeCreate;

    } else {
      // 新規モード
      this.editMode = EditMode.new;
    }
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * 保存ボタン押下イベント
   */
  onClickSave() {

    // 入力チェック（エラーが存在する場合は、後続の処理を中断）
    if (this.validate()) {
      return;
    }

    this.activity = this.addActivityFormGroup.value;

    switch (this.editMode) {
      case EditMode.new:
        this.service.createActivity(this.activity).subscribe(() => {
          this.toastr.success('登録が完了しました。', '成功');
          if (this.continueCreateFlg) {
            // 連続作成フラグがONの場合、編集対象をクリアする
            this.activity = {};
            this.addActivityFormGroup.reset();
          }
        }, error => {
          this.toastr.error('登録に失敗しました。'　+ error.status + '：' + error.statusText, 'エラー');
        });
      break;
      case EditMode.edit:
        this.service.updateActivity(this.activity, this.activityId).subscribe(result => {
          this.toastr.success('更新が完了しました。', '成功');
        }, error => {
          this.toastr.error('更新に失敗しました。' + error.status + '：' + error.statusText, 'エラー');
        });
      break;
    }
  }

  /**
   * 戻るボタン押下イベント
   */
  onClickBack() {
    // TODO アクティビティ一覧タブが表示された状態で遷移させる
    this.router.navigate(['/show-container-page']);
  }

  /**
   * 時間の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeHours() {
    // 数字のみチェック
    let value = this.addActivityFormGroup.controls.requiredHours.value;
    if (!this.patternNumber.test(value)) {
      this.addActivityFormGroup.controls.requiredHours.setValue(0);
      return;
    }

    // 全角を半角に変換
    this.addActivityFormGroup.controls.requiredHours.setValue(this.toHalfWidth(value));
  }

  /**
   * 時間（分）の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeMinutes() {
    // 数字のみチェック
    let value = this.addActivityFormGroup.controls.requiredMinutes.value;
    if (!this.patternNumber.test(value)) {
      this.addActivityFormGroup.controls.requiredMinutes.setValue(0);
      return;
    }

    // 全角を半角に変換
    value = this.toHalfWidth(value);

    // 60(分)より高い値の場合は 60(分)に変換
    const maxMinutes = 60;
    if (Number(value) > maxMinutes ) {
      this.addActivityFormGroup.controls.requiredMinutes.setValue(maxMinutes);
    } else {
      this.addActivityFormGroup.controls.requiredMinutes.setValue(value);
    }
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.addActivityFormGroup.controls.activityName.markAsDirty();
    this.addActivityFormGroup.controls.country.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    valid = this.addActivityFormGroup.invalid;

    return valid; 
  }

  /**
   * 半角を全角に変換します。
   */
  toHalfWidth(value) {
    return value.replace(/[０-９]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  }

}