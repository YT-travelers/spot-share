import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Spot } from '../entity/spot';
import { SpotService } from '../shared/spot.service';

@Component({
  selector: 'add-spot-page',
  templateUrl: './add-spot-page.component.html',
  styleUrls: ['./add-spot-page.component.scss']
})
export class AddSpotPageComponent {

  /** 画像アップロード&表示エリア */
  @ViewChild('thumbnail') thumbnail: ElementRef;

  addSpotFormGroup = new FormGroup({
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
    /** 所要時間（予想 */
    requiredTimeExpectation: new FormControl(''),
    /** url */
    url: new FormControl(''),
    /** 備考 */
    remark: new FormControl(''),
    /** 作成日付 */
    createDateTime: new FormControl(''),
    /** 更新日付 */
    updateDateTime: new FormControl(''),
  });

  /** 行きたい度 */
  favoritePoint = 3;

  /** 画像タイトル */
  imageTitle = '';

  constructor(
    private router: Router,
    private service: SpotService,
  ) {}

  /**
   * 保存ボタン押下イベント
   */
  onClickSave() {
    const spot: Spot = this.addSpotFormGroup.value;
    this.service.createSpot(spot).subscribe(result => {
      // TODO 登録完了の通知
      console.log(result);
    });
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
