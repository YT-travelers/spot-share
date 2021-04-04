import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { filter as _filter } from 'lodash';

import { ITourism } from '../model/tourism';
import { TourismService } from '../shared/tourism.service';

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
  editMode

  /** 観光地編集モード（HTML用） */
  EditMode = EditMode;

  /** 編集対象 */
  tourism: ITourism = {};

  /** 画面上に表示する観光地情報のID */
  tourismId = '';

  /** 画像タイトル */
  imageTitle = '';

  /** 国のマスタ情報 */
  allCountries: string[] = ['One', 'Two', 'Three']; // TODO 国のマスタ情報は初期表示時にバックから取得する

  /** 国のインクリメンタルサーチ抽出結果 */
  filteredCountries: Observable<string[]>;

  /** 連続作成フラグ */
  continueCreateFlg = true;

  /** 正規表現　全角数字 or 半角数字のみ */
  patternNumber = /[0-9０-９]/;

  /** 観光地情報 フォームグループ */
  addTourismFormGroup = new FormGroup({
    /** 観光地ID */
    tourismId: new FormControl(this.tourism.tourismId),
    /**  観光地名称 */
    tourismName: new FormControl(this.tourism.tourismName, [Validators.required]),
    /** 国 */
    country: new FormControl(this.tourism.country),
    /** 営業開始時間 */
    tourismOpenTime: new FormControl(this.tourism.tourismOpenTime),
    /** 営業終了時間 */
    tourismCloseTime: new FormControl(this.tourism.tourismCloseTime, [ Validators.min(0), Validators.max(60)]),
    /** 概要 */
    tourismSummary: new FormControl(this.tourism.tourismSummary),
    /** 住所 */
    tourismAddress: new FormControl(this.tourism.tourismAddress, [Validators.pattern('^[0-9]*$')]),
    /** url */
    tourismUrl: new FormControl(this.tourism.tourismUrl),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TourismService,
    private toastr: ToastrService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit() {

    // 所要時間はデフォルトで１時間とする
    this.addTourismFormGroup.patchValue({
      costExpectation: 0,
      requiredHours: 1,
      requiredMinutes: 0
    })

    // 国インプットのインクリメンタルサーチ購読
    this.filteredCountries = this.addTourismFormGroup.controls.country.valueChanges
    .pipe(
      debounceTime(100),
      startWith(''),
      map(value => this._filter(value))
    );

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
  onClickSave() {

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
        this.service.updateTourism(this.tourism, this.tourismId).subscribe(result => {
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
    // TODO 観光地一覧タブが表示された状態で遷移させる
    this.router.navigate(['/show-container-page']);
  }

  /**
   * 国のBlurイベント
   * 国のマスタのリストに存在しない値が入力されていた場合、値をクリアする
   */
  onBlurCountry() {
    const isExist = _filter(this.allCountries, e => {
      return e === this.addTourismFormGroup.controls.country.value;    
    }).length === 1;

    if (!isExist) {
      this.addTourismFormGroup.controls.country.setValue('');
    }
  }

  /**
   * 費用（予算）の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeCostExpectation() {
    // 数字のみチェック
    let value = this.addTourismFormGroup.controls.costExpectation.value;
    const pattern = /[0-9０-９]/;
    if (!pattern.test(value)) {
      this.addTourismFormGroup.controls.costExpectation.setValue(0);
      return;
    }

    // 全角を半角に変換
    this.addTourismFormGroup.controls.costExpectation.setValue(this.toHalfWidth(value));
  }

  /**
   * 時間の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeHours() {
    // 数字のみチェック
    let value = this.addTourismFormGroup.controls.requiredHours.value;
    if (!this.patternNumber.test(value)) {
      this.addTourismFormGroup.controls.requiredHours.setValue(0);
      return;
    }

    // 全角を半角に変換
    this.addTourismFormGroup.controls.requiredHours.setValue(this.toHalfWidth(value));
  }

  /**
   * 時間（分）の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeMinutes() {
    // 数字のみチェック
    let value = this.addTourismFormGroup.controls.requiredMinutes.value;
    if (!this.patternNumber.test(value)) {
      this.addTourismFormGroup.controls.requiredMinutes.setValue(0);
      return;
    }

    // 全角を半角に変換
    value = this.toHalfWidth(value);

    // 60(分)より高い値の場合は 60(分)に変換
    const maxMinutes = 60;
    if (Number(value) > maxMinutes ) {
      this.addTourismFormGroup.controls.requiredMinutes.setValue(maxMinutes);
    } else {
      this.addTourismFormGroup.controls.requiredMinutes.setValue(value);
    }
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 国インプットのインクリメンタルサーチの絞り込み処理
   * @param value 国インプットの入力値
   */
  private _filter(value: string): string[] {
    let filterValue = '';
    if (value) {
      filterValue = value.toLowerCase();
    }
    return this.allCountries.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.addTourismFormGroup.controls.tourismName.markAsDirty();
    this.addTourismFormGroup.controls.country.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    valid = this.addTourismFormGroup.invalid;

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