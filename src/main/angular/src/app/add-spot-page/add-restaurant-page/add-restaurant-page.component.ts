import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter as _filter } from 'lodash';

import { IRestaurant } from 'src/app/shared/model/restaurant';
import { RestaurantService } from 'src/app/shared/service/restaurant.service';

// 飲食店編集モード列挙値
export enum EditMode {
  // 新規モード（URL例：add-restaurant-page）
  new,
  // 編集モード（URL例：add-restaurant-page;id=1）
  edit,
  // ルート作成モード
  routeCreate,
}

@Component({
  selector: 'app-add-restaurant-page',
  templateUrl: './add-restaurant-page.component.html',
  styleUrls: ['./add-restaurant-page.component.scss']
})
export class AddRestaurantPageComponent implements OnInit {

  /** ルート作成画面で選択された飲食店情報が格納される */
  @Input() selectedRestaurant: IRestaurant;

  /** 飲食店編集モード */
  editMode;

  /** 飲食店編集モード（HTML用） */
  EditMode = EditMode;

  /** 編集対象 */
  restaurant: IRestaurant = {};

  /** 画面上に表示する飲食店情報のID */
  restaurantId = '';

  /** 画像タイトル */
  imageTitle = '';

  /** 連続作成フラグ */
  continueCreateFlg = true;

  /** 正規表現　全角数字 or 半角数字のみ */
  patternNumber = /[0-9０-９]/;

  /** 飲食店情報 フォームグループ */
  addRestaurantFormGroup = new FormGroup({
    /** 飲食店ID */
    restaurantId: new FormControl(this.restaurant.restaurantId),
    /**  飲食店名称 */
    restaurantName: new FormControl(this.restaurant.restaurantName, [Validators.required]),
    /** 営業開始時間（時） */
    restaurantOpenTimeHours: new FormControl(this.restaurant.restaurantOpenTimeHours),
    /** 営業開始時間（分） */
    restaurantOpenTimeMinutes: new FormControl(this.restaurant.restaurantOpenTimeMinutes),
    /** 営業終了時間（時） */
    restaurantCloseTimeHours: new FormControl(this.restaurant.restaurantCloseTimeHours),
    /** 営業終了時間（分） */
    restaurantCloseTimeMinutes: new FormControl(this.restaurant.restaurantCloseTimeMinutes),
    /** 住所 */
    restaurantAddress: new FormControl(this.restaurant.restaurantAddress, [Validators.pattern('^[0-9]*$')]),
    /** url */
    restaurantUrl: new FormControl(this.restaurant.restaurantUrl),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RestaurantService,
    private toastr: ToastrService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {

    // 飲食店編集モードの判定
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    if (this.restaurantId) {
      // 既存飲食店編集モード
      this.editMode = EditMode.edit;
      this.service.getRestaurant(this.restaurantId).subscribe(result => {
        if (result) {
          this.restaurant = result;
          this.addRestaurantFormGroup.patchValue(this.restaurant);
        } else {
          // IDによるGET処理に失敗した場合は、新規モードで画面を開く
          this.editMode = EditMode.new;
        }
      }, () => {
        // IDによるGET処理に失敗した場合は、新規モードで画面を開く
        this.editMode = EditMode.new;
      });

    } else if (this.selectedRestaurant) {
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

    this.restaurant = this.addRestaurantFormGroup.value;

    switch (this.editMode) {
      case EditMode.new:
        this.service.createRestaurant(this.restaurant).subscribe(() => {
          this.toastr.success('登録が完了しました。', '成功');
          if (this.continueCreateFlg) {
            // 連続作成フラグがONの場合、編集対象をクリアする
            this.restaurant = {};
            this.addRestaurantFormGroup.reset();
          }
        }, error => {
          this.toastr.error('登録に失敗しました。'　+ error.status + '：' + error.statusText, 'エラー');
        });
        break;
      case EditMode.edit:
        this.service.updateRestaurant(this.restaurant, this.restaurantId).subscribe(result => {
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
    // TODO 飲食店一覧タブが表示された状態で遷移させる
    this.router.navigate(['/show-container-page']);
  }

  /**
   * 時間の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeHours() {
    // 数字のみチェック
    const value = this.addRestaurantFormGroup.controls.requiredHours.value;
    if (!this.patternNumber.test(value)) {
      this.addRestaurantFormGroup.controls.requiredHours.setValue(0);
      return;
    }

    // 全角を半角に変換
    this.addRestaurantFormGroup.controls.requiredHours.setValue(this.toHalfWidth(value));
  }

  /**
   * 時間（分）の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeMinutes() {
    // 数字のみチェック
    let value = this.addRestaurantFormGroup.controls.requiredMinutes.value;
    if (!this.patternNumber.test(value)) {
      this.addRestaurantFormGroup.controls.requiredMinutes.setValue(0);
      return;
    }

    // 全角を半角に変換
    value = this.toHalfWidth(value);

    // 60(分)より高い値の場合は 60(分)に変換
    const maxMinutes = 60;
    if (Number(value) > maxMinutes ) {
      this.addRestaurantFormGroup.controls.requiredMinutes.setValue(maxMinutes);
    } else {
      this.addRestaurantFormGroup.controls.requiredMinutes.setValue(value);
    }
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.addRestaurantFormGroup.controls.restaurantName.markAsDirty();
    this.addRestaurantFormGroup.controls.country.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    valid = this.addRestaurantFormGroup.invalid;

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
