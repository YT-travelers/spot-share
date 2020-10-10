import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ISpot } from '../model/spot';
import { SpotService } from '../shared/spot.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';

// スポット編集モード列挙値
export enum EditMode {
  // 新規モード（URL例：add-spot-page）
  new,
  // 編集モード（URL例：add-spot-page;id=1）
  edit,
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
  spot: ISpot;

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
    spotId: new FormControl(''),
    /**  スポット名称 */
    spotName: new FormControl(''),
    /** 国 */
    country: new FormControl(''),
    /** 画像パス */
    imagePaths: new FormControl(''),
    /** url */
    url: new FormControl(''),
    /** メモ */
    memo: new FormControl(''),
    /** 費用（予算） */
    costExpectation: new FormControl(''),
    /** 所要時間（時） */
    requiredHours: new FormControl(''),
    /** 所要時間（分） */
    requiredMinutes: new FormControl(''),
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

    // 国インプットのインクリメンタルサーチ購読
    this.filteredCountries = this.addSpotFormGroup.controls.country.valueChanges
    .pipe(
      debounceTime(100),
      startWith(''),
      map(value => this._filter(value))
    );

    // スポット編集モードの判定
    this.spotId = this.route.snapshot.paramMap.get('id');
    if (this.spotId) {
      // 既存スポット編集モード
      this.editMode = EditMode.edit;
      this.service.getSpot(this.spotId).subscribe(result => {
        if (result) {
          this.spot = result;
          this.addSpotFormGroup.setValue(this.spot);
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
      this.editMode = EditMode.edit;

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

}