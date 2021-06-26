import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter as _filter, forEach as _forEach } from 'lodash';

import { IHotel } from 'src/app/shared/model/hotel';
import { IHotelImage } from 'src/app/shared/model/hotelImage';
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
    /** ホテル画像 */
    hotelImages: new FormControl(this.hotel.hotelImages),
    /** アップロード画像 */
    uploadFiles: new FormControl(this.hotel.uploadFiles),
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
    this.router.navigate(['/show-container-page']);
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
        const image: IHotelImage = {
          hotelId: e.hotelId,
          hotelImageId: e.hotelImageId,
          hotelImageUrl: e.hotelImageUrl,
        }
        images.push(image);
      }
    })

    // アップロード用画像の格納
    this.addHotelFormGroup.controls.uploadFiles.setValue(uploadFiles);
    // 既存の画像情報を格納
    this.addHotelFormGroup.controls.hotelImages.setValue(images);
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
