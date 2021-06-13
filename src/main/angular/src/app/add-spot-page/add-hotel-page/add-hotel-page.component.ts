import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter as _filter } from 'lodash';

import { IHotel } from 'src/app/shared/model/hotel';
import { HotelService } from 'src/app/shared/service/hotel.service';

// ホテル編集モード列挙値
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

  /** ルート作成画面で選択されたホテル情報が格納される */
  @Input() selectedHotel: IHotel;

  /** ホテル編集モード */
  editMode;

  /** ホテル編集モード（HTML用） */
  EditMode = EditMode;

  /** 編集対象 */
  hotel: IHotel = {};

  /** 画面上に表示するホテル情報のID */
  hotelId = '';

  /** 画像タイトル */
  imageTitle = '';

  /** 連続作成フラグ */
  continueCreateFlg = true;

  /** ホテル情報 フォームグループ */
  addHotelFormGroup = new FormGroup({
    /** ホテルID */
    hotelId: new FormControl(this.hotel.hotelId),
    /**  ホテル名称 */
    hotelName: new FormControl(this.hotel.hotelName, [Validators.required]),
    /** 住所 */
    hotelAddress: new FormControl(this.hotel.hotelAddress),
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

  ngOnInit(): void {

    // ホテル編集モードの判定
    this.hotelId = this.route.snapshot.paramMap.get('hotelId');
    if (this.hotelId) {
      // 既存ホテル編集モード
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
  onClickSave(): void {

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
  onClickBack(): void {
    // TODO ホテル一覧タブが表示された状態で遷移させる
    this.router.navigate(['/show-container-page']);
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.addHotelFormGroup.controls.hotelName.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    valid = this.addHotelFormGroup.invalid;

    return valid;
  }

}
