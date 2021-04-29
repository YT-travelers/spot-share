import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter as _filter } from 'lodash';

import { IHotel } from 'src/app/model/hotel';
import { HotelService } from 'src/app/shared/hotel.service';

// 飲食店編集モード列挙値
export enum EditMode {
  // 新規モード（URL例：add-hotel-page）
  new,
  // 編集モード（URL例：add-hotel-page;id=1）
  edit,
  // ルート作成モード
  routeCreate,
}

@Component({
  selector: 'app-add-hotel-page',
  templateUrl: './add-hotel-page.component.html',
  styleUrls: ['./add-hotel-page.component.scss']
})
export class AddHotelPageComponent implements OnInit {

  /** ルート作成画面で選択された飲食店情報が格納される */
  @Input() selectedHotel: IHotel;

  /** 飲食店編集モード */
  editMode

  /** 飲食店編集モード（HTML用） */
  EditMode = EditMode;

  /** 編集対象 */
  hotel: IHotel = {};

  /** 画面上に表示する飲食店情報のID */
  hotelId = '';

  /** 画像タイトル */
  imageTitle = '';

  /** 連続作成フラグ */
  continueCreateFlg = true;

  /** 正規表現　全角数字 or 半角数字のみ */
  patternNumber = /[0-9０-９]/;

  /** 飲食店情報 フォームグループ */
  addHotelFormGroup = new FormGroup({
    /** 飲食店ID */
    hotelId: new FormControl(this.hotel.hotelId),
    /**  飲食店名称 */
    hotelName: new FormControl(this.hotel.hotelName, [Validators.required]),
    /** 住所 */
    hotelAddress: new FormControl(this.hotel.hotelAddress, [Validators.pattern('^[0-9]*$')]),
    /** url */
    hotelUrl: new FormControl(this.hotel.hotelUrl),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: HotelService,
    private toastr: ToastrService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit() {

    // 所要時間はデフォルトで１時間とする
    this.addHotelFormGroup.patchValue({
      costExpectation: 0,
      requiredHours: 1,
      requiredMinutes: 0
    })

    // 飲食店編集モードの判定
    this.hotelId = this.route.snapshot.paramMap.get('hotelId');
    if (this.hotelId) {
      // 既存飲食店編集モード
      this.editMode = EditMode.edit;
      this.service.getHotel(this.hotelId).subscribe(result => {
        if (result) {
          this.hotel = result;
          this.addHotelFormGroup.patchValue(this.hotel);
        } else {
          // IDによるGET処理に失敗した場合は、新規モードで画面を開く
          this.editMode = EditMode.new;
        }
      }, () => {
        // IDによるGET処理に失敗した場合は、新規モードで画面を開く
        this.editMode = EditMode.new;
      });

    } else if (this.selectedHotel) {
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

    this.hotel = this.addHotelFormGroup.value;

    switch (this.editMode) {
      case EditMode.new:
        this.service.createHotel(this.hotel).subscribe(() => {
          this.toastr.success('登録が完了しました。', '成功');
          if (this.continueCreateFlg) {
            // 連続作成フラグがONの場合、編集対象をクリアする
            this.hotel = {};
            this.addHotelFormGroup.reset();
          }
        }, error => {
          this.toastr.error('登録に失敗しました。'　+ error.status + '：' + error.statusText, 'エラー');
        });
      break;
      case EditMode.edit:
        this.service.updateHotel(this.hotel, this.hotelId).subscribe(result => {
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
    // TODO 飲食店一覧タブが表示された状態で遷移させる
    this.router.navigate(['/show-container-page']);
  }

  /**
   * 費用（予算）の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeCostExpectation() {
    // 数字のみチェック
    let value = this.addHotelFormGroup.controls.costExpectation.value;
    const pattern = /[0-9０-９]/;
    if (!pattern.test(value)) {
      this.addHotelFormGroup.controls.costExpectation.setValue(0);
      return;
    }

    // 全角を半角に変換
    this.addHotelFormGroup.controls.costExpectation.setValue(this.toHalfWidth(value));
  }

  /**
   * 時間の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeHours() {
    // 数字のみチェック
    let value = this.addHotelFormGroup.controls.requiredHours.value;
    if (!this.patternNumber.test(value)) {
      this.addHotelFormGroup.controls.requiredHours.setValue(0);
      return;
    }

    // 全角を半角に変換
    this.addHotelFormGroup.controls.requiredHours.setValue(this.toHalfWidth(value));
  }

  /**
   * 時間（分）の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeMinutes() {
    // 数字のみチェック
    let value = this.addHotelFormGroup.controls.requiredMinutes.value;
    if (!this.patternNumber.test(value)) {
      this.addHotelFormGroup.controls.requiredMinutes.setValue(0);
      return;
    }

    // 全角を半角に変換
    value = this.toHalfWidth(value);

    // 60(分)より高い値の場合は 60(分)に変換
    const maxMinutes = 60;
    if (Number(value) > maxMinutes ) {
      this.addHotelFormGroup.controls.requiredMinutes.setValue(maxMinutes);
    } else {
      this.addHotelFormGroup.controls.requiredMinutes.setValue(value);
    }
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.addHotelFormGroup.controls.hotelName.markAsDirty();
    this.addHotelFormGroup.controls.country.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    valid = this.addHotelFormGroup.invalid;

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