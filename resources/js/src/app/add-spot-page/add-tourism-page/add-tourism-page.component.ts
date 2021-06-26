import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { filter as _filter, includes, _includes, forEach as _forEach } from 'lodash';

import { TimeUtils } from 'src/app/shared/utils/time-utils.const';
import { ICountry } from 'src/app/shared/model/country';
import { ITourism } from 'src/app/shared/model/tourism';
import { ITourismImage } from 'src/app/shared/model/tourismImage';
import { TourismService } from 'src/app/shared/service/tourism.service';
import { CountryService } from 'src/app/shared/service/country.service';

// 観光地編集モード列挙値
export enum EditMode {
  // 新規モード（URL例：add-tourism-page）
  new,
  // 編集モード（URL例：add-tourism-page;id=1）
  edit,
  // ルート作成モード
  routeCreate,
}

@Component({
  selector: 'app-add-tourism-page',
  templateUrl: './add-tourism-page.component.html',
  styleUrls: ['./add-tourism-page.component.scss']
})
export class AddTourismPageComponent implements OnInit {

  /** ルート作成画面で選択された観光地情報が格納される */
  @Input() selectedTourism: ITourism;

  /** 観光地編集モード */
  editMode;

  /** 観光地編集モード（HTML用） */
  EditMode = EditMode;

  /** 編集対象 */
  tourism: ITourism = { country: {} };

  /** 画面上に表示する観光地情報のID */
  tourismId = '';

  /** 国のマスタ情報 */
  allCountries: ICountry[] = [];

  /** 国のインクリメンタルサーチ抽出結果 */
  filteredCountries: Observable<ICountry[]>;

  /** 連続作成フラグ */
  continueCreateFlg = true;

  /** 観光地情報 フォームグループ */
  addTourismFormGroup = new FormGroup({
    /** 観光地ID */
    tourismId: new FormControl(this.tourism.tourismId),
    /**  観光地名称 */
    tourismName: new FormControl(this.tourism.tourismName, [Validators.required]),
    /** 国 */
    country: new FormGroup({
      /** 国コード（画面非表示） */
      countryCode: new FormControl(this.tourism.country.countryCode),
      /** 国名称 */
      countryName: new FormControl(this.tourism.country.countryName, [Validators.required]),
    }),
    /** 営業開始時間（時） */
    tourismOpenTimeHours: new FormControl(this.tourism.tourismOpenTimeHours, [ Validators.min(0), Validators.max(23)]),
    /** 営業開始時間（分） */
    tourismOpenTimeMinutes: new FormControl(this.tourism.tourismOpenTimeMinutes, [ Validators.min(0), Validators.max(59)]),
    /** 営業終了時間（時） */
    tourismCloseTimeHours: new FormControl(this.tourism.tourismCloseTimeHours, [ Validators.min(0), Validators.max(23)]),
    /** 営業終了時間（分） */
    tourismCloseTimeMinutes: new FormControl(this.tourism.tourismCloseTimeMinutes, [ Validators.min(0), Validators.max(59)]),
    /** 概要 */
    tourismSummary: new FormControl(this.tourism.tourismSummary),
    /** 住所 */
    tourismAddress: new FormControl(this.tourism.tourismAddress),
    /** url */
    tourismUrl: new FormControl(this.tourism.tourismUrl),
    /** 観光地画像 */
    tourismImages: new FormControl(this.tourism.tourismImages),
    /** アップロード画像 */
    uploadFiles: new FormControl(this.tourism.uploadFiles),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TourismService,
    private countryService: CountryService,
    private toastr: ToastrService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {

    // 国マスタ取得
    this.countryService.searchCountries().subscribe(result => {
      this.allCountries = result;

      // 国インプットのインクリメンタルサーチ購読
      this.filteredCountries = this.country.valueChanges
      .pipe(
        debounceTime(100),
        startWith(''),
        map(value => this.countryFilter(value.countryName))
      );
    });

    // 観光地編集モードの判定
    this.tourismId = this.route.snapshot.paramMap.get('tourismId');
    if (this.tourismId) {
      // 既存観光地編集モード
      this.editMode = EditMode.edit;
      this.service.getTourism(this.tourismId).subscribe(result => {
        if (result) {
          this.tourism = result;
          this.addTourismFormGroup.patchValue(this.tourism);
        } else {
          // IDによるGET処理に失敗した場合は、新規モードで画面を開く
          this.editMode = EditMode.new;
        }
      }, () => {
        // IDによるGET処理に失敗した場合は、新規モードで画面を開く
        this.editMode = EditMode.new;
      });

    } else if (this.selectedTourism) {
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

    this.tourism = this.addTourismFormGroup.value;

    switch (this.editMode) {
      case EditMode.new:
        this.service.createTourism(this.tourism).subscribe(() => {
          this.toastr.success('登録が完了しました。', '成功');
          if (this.continueCreateFlg) {
            // 連続作成フラグがONの場合、編集対象をクリアする
            this.tourism = {};
            this.addTourismFormGroup.reset();
          }
        }, error => {
          this.toastr.error('登録に失敗しました。'　+ error.status + '：' + error.statusText, 'エラー');
        });
        break;
      case EditMode.edit:
        this.service.updateTourism(this.tourism, this.tourismId).subscribe(() => {
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
   * 国名称のBlurイベント
   * ・国マスタのリストに存在する値が入力されていた場合、該当する国コードを設定する
   * ・国マスタのリストに存在しない値が入力されていた場合、国名称の値をクリアする
   */
  onBlurCountry(): void {
    setTimeout(() => {
      const country: ICountry[] = _filter(this.allCountries, e => {
        return e.countryName === this.country.value.countryName;
      });

      if (country.length === 1) {
        // 存在チェックOK  国コードを設定
        this.country.controls.countryCode.setValue(country[0].countryCode);
      } else {
        // 存在チェックNG  国名称をクリア
        this.country.controls.countryName.setValue('');
      }
    }, 100);
  }

  /**
   * 営業開始時間の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（時間）
   */
  onChangeOpenHours(value): void {
    this.addTourismFormGroup.controls.tourismOpenTimeHours.setValue(TimeUtils.complementHour(value));
  }

  /**
   * 営業終了時間の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（時間）
   */
  onChangeCloseHours(value): void {
    this.addTourismFormGroup.controls.tourismCloseTimeHours.setValue(TimeUtils.complementHour(value));
  }

  /**
   * 営業開始時間（分）の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（分）
   */
  onChangeOpenMinutes(value): void {
    this.addTourismFormGroup.controls.tourismOpenTimeMinutes.setValue(TimeUtils.complementMinutes(value));
  }

  /**
   * 営業終了時間（分）の変更イベント
   * 入力チェック ＋ 変換
   * @param 入力値（分）
   */
  onChangeCloseMinutes(value): void {
    this.addTourismFormGroup.controls.tourismCloseTimeMinutes.setValue(TimeUtils.complementMinutes(value));
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
        const image: ITourismImage = {
          tourismId: e.tourismId,
          tourismImageId: e.tourismImageId,
          tourismImageUrl: e.tourismImageUrl,
        }
        images.push(image);
      }
    })

    // アップロード用画像の格納
    this.addTourismFormGroup.controls.uploadFiles.setValue(uploadFiles);
    // 既存の画像情報を格納
    this.addTourismFormGroup.controls.tourismImages.setValue(images);
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 国インプットのインクリメンタルサーチの絞り込み処理
   * @param value 国インプットの入力値
   */
  private countryFilter(value: string): ICountry[] {
    let filterValue = '';
    if (value) {
      filterValue = value;
    }
    return _filter(this.allCountries, e => includes(e.countryName, filterValue));
  }

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  private validate(): boolean {
    this.addTourismFormGroup.controls.tourismName.markAsDirty();
    this.country.controls.countryName.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    if (this.addTourismFormGroup.invalid) {
      valid = true;
    }
    if (this.country.invalid) {
      valid = true;
    }

    return valid;
  }

  // -----------------------------------------------------------------------
  // getter

  /** 国 */
  get country(): FormGroup {
    return this.addTourismFormGroup.get('country') as FormGroup;
  }

}
