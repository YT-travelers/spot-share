import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter as _filter, forEach as _forEach } from 'lodash';

import { TimeUtils } from 'src/app/shared/utils/time-utils.const';
import { IActivity } from 'src/app/shared/model/activity';
import { IActivityImage } from 'src/app/shared/model/activityImage';
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
  editMode;

  /** アクティビティ編集モード（HTML用） */
  EditMode = EditMode;

  /** 編集対象 */
  activity: IActivity = {};

  /** 画面上に表示するアクティビティ情報のID */
  activityId = '';

  /** 連続作成フラグ */
  continueCreateFlg = true;

  /** アクティビティ情報 フォームグループ */
  addActivityFormGroup = new FormGroup({
    /** アクティビティID */
    activityId: new FormControl(this.activity.activityId),
    /**  アクティビティ名称 */
    activityName: new FormControl(this.activity.activityName, [Validators.required]),
    /** アクティビティ概要 */
    activitySummary: new FormControl(this.activity.activitySummary),
    /** 営業開始時間（時） */
    activityOpenTimeHours: new FormControl(this.activity.activityOpenTimeHours, [ Validators.min(0), Validators.max(23)]),
    /** 営業開始時間（分） */
    activityOpenTimeMinutes: new FormControl(this.activity.activityOpenTimeMinutes, [ Validators.min(0), Validators.max(59)]),
    /** 営業終了時間（時） */
    activityCloseTimeHours: new FormControl(this.activity.activityCloseTimeHours, [ Validators.min(0), Validators.max(23)]),
    /** 営業終了時間（分） */
    activityCloseTimeMinutes: new FormControl(this.activity.activityCloseTimeMinutes, [ Validators.min(0), Validators.max(59)]),
    /** 住所 */
    activityAddress: new FormControl(this.activity.activityAddress),
    /** url */
    activityUrl: new FormControl(this.activity.activityUrl),
    /** アクティビティ画像 */
    activityImages: new FormControl(this.activity.activityImages),
    /** アップロード画像 */
    uploadFiles: new FormControl(this.activity.uploadFiles),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ActivityService,
    private toastr: ToastrService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {

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
  onClickSave(): void {

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
          } else {
            // 連続作成フラグがOFFの場合、一覧画面に戻る
            this.router.navigate(['/show-container-page']);
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
  onClickBack(): void {
    this.router.navigate(['/show-container-page']);
  }

  /**
   * 営業開始時間の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（時間）
  */
   onChangeOpenHours(value): void {
    this.addActivityFormGroup.controls.activityOpenTimeHours.setValue(TimeUtils.complementHour(value));
  }

  /**
   * 営業終了時間の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（時間）
   */
  onChangeCloseHours(value): void {
    this.addActivityFormGroup.controls.activityCloseTimeHours.setValue(TimeUtils.complementHour(value));
  }

  /**
   * 営業開始時間（分）の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（分）
   */
  onChangeOpenMinutes(value): void {
    this.addActivityFormGroup.controls.activityOpenTimeMinutes.setValue(TimeUtils.complementMinutes(value));
  }

  /**
   * 営業終了時間（分）の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（分）
   */
  onChangeCloseMinutes(value): void {
    this.addActivityFormGroup.controls.activityCloseTimeMinutes.setValue(TimeUtils.complementMinutes(value));
  }

  /**
   * 画像情報配列更新イベント
   * @param event 画像情報配列
   */
  onUpdateCarouselInfosEvent(event) {
    // アップロード画像のバイナリデータ配列
    const uploadFiles = [];
    // アップロード済みの画像情報配列
    const images = [];

    _forEach(event, e => {
      if (e.newUploadFlg) {
        uploadFiles.push(e.inputImageBinary);
      } else {
        const image: IActivityImage = {
          activityId: e.activityId,
          activityImageId: e.activityImageId,
          activityImageUrl: e.activityImageUrl,
        }
        images.push(image);
      }
    })

    // アップロード用画像の格納
    this.addActivityFormGroup.controls.uploadFiles.setValue(uploadFiles);
    // 既存の画像情報を格納
    this.addActivityFormGroup.controls.activityImages.setValue(images);
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.addActivityFormGroup.controls.activityName.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    valid = this.addActivityFormGroup.invalid;

    return valid;
  }

}
