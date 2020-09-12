import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Spot } from '../entity/spot';
import { SpotService } from '../shared/spot.service';

// スポット編集モード列挙値
export enum EditMode {
  // 新規モード（URL例：add-spot-page）
  new,
  // 編集モード（URL例：add-spot-page;id=1）
  edit,
  // ルート作成モード（URL例：create-route-page）
  createRoute
}

@Component({
  selector: 'add-spot-page',
  templateUrl: './add-spot-page.component.html',
  styleUrls: ['./add-spot-page.component.scss']
})
export class AddSpotPageComponent implements OnInit {

  /** 画像アップロード&表示エリア */
  @ViewChild('thumbnail') thumbnail: ElementRef;

  /** ルート作成画面で選択されたスポット情報が格納される */
  @Input() selectedSpot: Spot;

  /** スポット編集モード */
  editMode

  /** 編集対象 */
  spot: Spot;

  /** 画面上に表示するスポット情報のID */
  spotId = '';

  /** 行きたい度 */
  favoritePoint = 3;

  /** 画像タイトル */
  imageTitle = '';

  addSpotFormGroup = new FormGroup({
    /** id */
    id: new FormControl(''),
    /** 画像パス */
    imagePath: new FormControl(''),
    /** ルート番号 */ 
    routeNumber: new FormControl(''),
    /** スケジュール日時 */
    scheduleDateTime: new FormControl(''),
    /** 国 */
    country: new FormControl(''),
    /**  スポット名称 */
    spotName: new FormControl(''),
    /** 費用（予算） */
    costExpectation: new FormControl(''),
    /** 所要時間（予想） */
    requiredTimeExpectation: new FormControl(''),
    /** 行きたい度 */
    favoritePoint: new FormControl(''),
    /** url */
    url: new FormControl(''),
    /** 備考 */
    remark: new FormControl(''),
    /** 作成日付 */
    createDateTime: new FormControl(''),
    /** 更新日付 */
    updateDateTime: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: SpotService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit() {
    // スポット編集モードの判定
    this.spotId = this.route.snapshot.paramMap.get('id');
    if (this.spotId) {
      // 既存スポット編集モード
      this.editMode = EditMode.edit;
      this.service.getSpot(this.spotId).subscribe(result => {
        if (result) {
          this.spot = result;
          this.addSpotFormGroup.setValue(this.spot);
          this.favoritePoint = this.spot.favoritePoint;
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
      this.favoritePoint = this.spot.favoritePoint;

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
    this.spot.favoritePoint = this.favoritePoint;

    switch (this.editMode) {
      case EditMode.new:
        this.service.createSpot(this.spot).subscribe(result => {
          // TODO 登録完了の通知
          console.log(result);
        });
      break;
      
      case EditMode.edit:
      case EditMode.createRoute:
        this.service.updateSpot(this.spot).subscribe(result => {
          // TODO 更新完了の通知
          console.log(result);
        });
      break;
    }
  }

  /**
   * ファイルドロップイベント
   */
  onDrop(event) {  
    const reader = new FileReader();
    const file = event.dataTransfer.files[0];
    const thumbnail = this.thumbnail.nativeElement;

    reader.addEventListener("load", function () {;
      thumbnail.src = reader.result;
    }, false);

    if(file) {
      this.imageTitle = file.name;
      reader.readAsDataURL(file) ;
    }
  }

  /**
   * 画像削除ボタン
   */
  onClickDeleteImage() {
    const thumbnail = this.thumbnail.nativeElement;
    thumbnail.src = '';
    this.imageTitle = '';
  }

  /**
   * 戻るボタン押下イベント
   */
  onClickBack() {
    this.router.navigate(['/show-spot-page']);
  }
}