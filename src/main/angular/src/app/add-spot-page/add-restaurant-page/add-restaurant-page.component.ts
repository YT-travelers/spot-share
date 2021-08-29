import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter as _filter, forEach as _forEach } from 'lodash';

import { TimeUtils } from 'src/app/shared/utils/time-utils.const';
import { IRestaurant } from 'src/app/shared/model/restaurant';
import { IRestaurantImage } from 'src/app/shared/model/restaurantImage';
import { RestaurantService } from 'src/app/shared/service/restaurant.service';
import { Code } from 'src/app/shared/const/code-div.const';
import { ICodeList } from 'src/app/shared/model/code-list';
import { TabIndex } from 'src/app/shared/const/const.const';

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

  /** 飲食店種類区分リスト */
  RestaurantKindDivList: ICodeList[] = Code.RestaurantKindDiv.List;
  
  /** 料理ジャンル区分リスト */
  CuisineGenreDivList: ICodeList[] = Code.CuisineGenreDiv.List;

  /** 画面上に表示する飲食店情報のID */
  restaurantId = '';

  /** 連続作成フラグ */
  continueCreateFlg = true;

  /** 飲食店情報 フォームグループ */
  addRestaurantFormGroup = new FormGroup({
    /** 飲食店ID */
    restaurantId: new FormControl(this.restaurant.restaurantId),
    /**  飲食店名称 */
    restaurantName: new FormControl(this.restaurant.restaurantName, [Validators.required]),
    /** 概要 */
    restaurantSummary: new FormControl(this.restaurant.restaurantSummary),
    /** 飲食店種類区分 */
    restaurantKindDiv: new FormControl(0),
    /** 料理ジャンル区分 */
    cuisineGenreDiv: new FormControl(0),
    /** 営業開始時間（時） */
    restaurantOpenTimeHours: new FormControl(this.restaurant.restaurantOpenTimeHours, [ Validators.min(0), Validators.max(23)]),
    /** 営業開始時間（分） */
    restaurantOpenTimeMinutes: new FormControl(this.restaurant.restaurantOpenTimeMinutes, [ Validators.min(0), Validators.max(59)]),
    /** 営業終了時間（時） */
    restaurantCloseTimeHours: new FormControl(this.restaurant.restaurantCloseTimeHours, [ Validators.min(0), Validators.max(23)]),
    /** 営業終了時間（分） */
    restaurantCloseTimeMinutes: new FormControl(this.restaurant.restaurantCloseTimeMinutes, [ Validators.min(0), Validators.max(59)]),
    /** 住所 */
    restaurantAddress: new FormControl(this.restaurant.restaurantAddress),
    /** url */
    restaurantUrl: new FormControl(this.restaurant.restaurantUrl),
    /** 飲食店画像 */
    restaurantImages: new FormControl(this.restaurant.restaurantImages),
    /** アップロード画像 */
    uploadFiles: new FormControl(this.restaurant.uploadFiles),
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
          } else {
            // 連続作成フラグがOFFの場合、スポット一覧画面に戻る
            this.router.navigate(['/show-container-page', { selectIndex: TabIndex.Spot }]);
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
    this.router.navigate(['/show-container-page', { selectIndex: TabIndex.Spot }]);
  }

  /**
   * 営業開始時間の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（時間）
  */
  onChangeOpenHours(value): void {
    this.addRestaurantFormGroup.controls.restaurantOpenTimeHours.setValue(TimeUtils.complementHour(value));
  }

  /**
   * 営業終了時間の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（時間）
   */
  onChangeCloseHours(value): void {
    this.addRestaurantFormGroup.controls.restaurantCloseTimeHours.setValue(TimeUtils.complementHour(value));
  }

  /**
   * 営業開始時間（分）の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（分）
   */
  onChangeOpenMinutes(value): void {
    this.addRestaurantFormGroup.controls.restaurantOpenTimeMinutes.setValue(TimeUtils.complementMinutes(value));
  }

  /**
   * 営業終了時間（分）の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（分）
   */
  onChangeCloseMinutes(value): void {
    this.addRestaurantFormGroup.controls.restaurantCloseTimeMinutes.setValue(TimeUtils.complementMinutes(value));
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
        const image: IRestaurantImage = {
          restaurantId: e.restaurantId,
          restaurantImageId: e.restaurantImageId,
          restaurantImageUrl: e.restaurantImageUrl,
        }
        images.push(image);
      }
    })

    // アップロード用画像の格納
    this.addRestaurantFormGroup.controls.uploadFiles.setValue(uploadFiles);
    // 既存の画像情報を格納
    this.addRestaurantFormGroup.controls.restaurantImages.setValue(images);
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.addRestaurantFormGroup.controls.restaurantName.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    valid = this.addRestaurantFormGroup.invalid;

    return valid;
  }

}
