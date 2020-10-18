import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { filter as _filter } from 'lodash';

import { ISpot } from '../model/spot';
import { SpotService } from '../shared/spot.service';

// スポット編集モード列挙値
export enum EditMode {
  // 新規モード（URL例：add-spot-page）
  new,
  // 編集モード（URL例：add-spot-page;id=1）
  edit,
  // ルート作成モード
  routeCreate,
}

@Component({
  selector: 'app-add-spot-page',
  templateUrl: './add-spot-page.component.html',
  styleUrls: ['./add-spot-page.component.scss']
})
export class AddSpotPageComponent implements OnInit {

  /** 画像アップロード&表示エリア */
  @ViewChild('thumbnail') thumbnail: ElementRef;

  /** ルート作成画面で選択されたスポット情報が格納される */
  @Input() selectedSpot: ISpot;

  /** スポット編集モード */
  editMode

  /** 編集対象 */
  spot: ISpot = {};

  /** 画面上に表示するスポット情報のID */
  spotId = '';

  /** 画像タイトル */
  imageTitle = '';

  /** 国のマスタ情報 */
  allCountries: string[] = ['One', 'Two', 'Three']; // TODO 国のマスタ情報は初期表示時にバックから取得する

  /** 国のインクリメンタルサーチ抽出結果 */
  filteredCountries: Observable<string[]>;

  addSpotFormGroup = new FormGroup({
    /** スポットID */
    spotId: new FormControl(this.spot.spotId),
    /**  スポット名称 */
    spotName: new FormControl(this.spot.spotName, [Validators.required]),
    /** 国 */
    country: new FormControl(this.spot.country),
    /** 画像パス */
    imagePaths: new FormControl(this.spot.imagePaths),
    /** url */
    url: new FormControl(this.spot.url),
    /** メモ */
    memo: new FormControl(this.spot.memo),
    /** 費用（予算） */
    costExpectation: new FormControl(this.spot.costExpectation, [Validators.pattern('^[0-9]*$')]),
    /** 所要時間（時） */
    requiredHours: new FormControl(this.spot.requiredHours),
    /** 所要時間（分） */
    requiredMinutes: new FormControl(this.spot.requiredMinutes, [ Validators.min(0), Validators.max(60)]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SpotService,
    private toastr: ToastrService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit() {

    // 所要時間はデフォルトで１時間とする
    this.addSpotFormGroup.patchValue({
      costExpectation: 0,
      requiredHours: 1,
      requiredMinutes: 0
    })

    // 国インプットのインクリメンタルサーチ購読
    this.filteredCountries = this.addSpotFormGroup.controls.country.valueChanges
    .pipe(
      debounceTime(100),
      startWith(''),
      map(value => this._filter(value))
    );

    // スポット編集モードの判定
    this.spotId = this.route.snapshot.paramMap.get('spotId');
    if (this.spotId) {
      // 既存スポット編集モード
      this.editMode = EditMode.edit;
      this.service.getSpot(this.spotId).subscribe(result => {
        if (result) {
          this.spot = result;
          this.addSpotFormGroup.patchValue(this.spot);
        } else {
          // IDによるGET処理に失敗した場合は、新規モードで画面を開く
          this.editMode = EditMode.new;
        }
      }, () => {
        // IDによるGET処理に失敗した場合は、新規モードで画面を開く
        this.editMode = EditMode.new;
      });

    } else if (this.selectedSpot) {
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

    this.spot = this.addSpotFormGroup.value;

    switch (this.editMode) {
      case EditMode.new:
        this.service.createSpot(this.spot).subscribe(() => {
          this.toastr.success('登録が完了しました。', '成功');
        }, error => {
          this.toastr.error('登録に失敗しました。'　+ error.status + '：' + error.statusText, 'エラー');
        });
      break;
      
      case EditMode.edit:
        this.service.updateSpot(this.spot, this.spotId).subscribe(result => {
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
    // TODO スポット一覧タブが表示された状態で遷移させる
    this.router.navigate(['/show-container-page']);
  }

  /**
   * 国のBlurイベント
   * 国のマスタのリストに存在しない値が入力されていた場合、値をクリアする
   */
  onBlurCountry() {
    const isExist = _filter(this.allCountries, e => {
      return e === this.addSpotFormGroup.controls.country.value;    
    }).length === 1;

    if (!isExist) {
      this.addSpotFormGroup.controls.country.setValue('');
    }
  }

  /**
   * 費用（予算）の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeCostExpectation() {
    // 数字のみチェック
    let value = this.addSpotFormGroup.controls.costExpectation.value;
    const pattern = /[0-9０-９]/;
    if (!pattern.test(value)) {
      this.addSpotFormGroup.controls.costExpectation.setValue(0);
      return;
    }

    // 全角を半角に変換
    this.addSpotFormGroup.controls.costExpectation.setValue(this.toHalfWidth(value));
  }

  /**
   * 時間の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeHours() {
    // 数字のみチェック
    let value = this.addSpotFormGroup.controls.requiredHours.value;
    const pattern = /[0-9０-９]/;
    if (!pattern.test(value)) {
      this.addSpotFormGroup.controls.requiredHours.setValue(0);
      return;
    }

    // 全角を半角に変換
    this.addSpotFormGroup.controls.requiredHours.setValue(this.toHalfWidth(value));
  }

  /**
   * 時間（分）の変更イベント
   * 入力チェック ＋ 変換
   */
  onChangeMinutes() {
    // 数字のみチェック
    let value = this.addSpotFormGroup.controls.requiredMinutes.value;
    const pattern = /[0-9０-９]/;
    if (!pattern.test(value)) {
      this.addSpotFormGroup.controls.requiredMinutes.setValue(0);
      return;
    }

    // 全角を半角に変換
    value = this.toHalfWidth(value);

    // 60(分)より高い値の場合は 60(分)に変換
    const maxMinutes = 60;
    if (Number(value) > maxMinutes ) {
      this.addSpotFormGroup.controls.requiredMinutes.setValue(maxMinutes);
    } else {
      this.addSpotFormGroup.controls.requiredMinutes.setValue(value);
    }
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 国インプットのインクリメンタルサーチの絞り込み処理
   * @param value 国インプットの入力値
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCountries.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * 入力値検証
   * @return true → エラー有り
   */
  validate(): boolean {
    this.addSpotFormGroup.controls.spotName.markAsDirty();
    this.addSpotFormGroup.controls.country.markAsDirty();

    let valid = false;

    // formGroupでのエラー検証
    valid = this.addSpotFormGroup.invalid;

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