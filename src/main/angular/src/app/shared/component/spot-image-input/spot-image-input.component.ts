import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { forEach as _forEach, head as _head } from 'lodash';
import { ITourismImage } from 'src/app/shared/model/tourismImage';
import { IRestaurantImage } from 'src/app/shared/model/restaurantImage';
import { IHotelImage } from 'src/app/shared/model/hotelImage';
import { IActivityImage } from 'src/app/shared/model/activityImage';

export interface ICarousel {
  /** NgbCarouselが自動で付与するid */
  id?: string;
  /** 画像バイナリデータ */
  inputImageBinary: string | ArrayBuffer;
  /** 新しく追加する画像かを判定するフラグ*/
  newUploadFlg: boolean;
}

@Component({
  selector: 'app-spot-image-input',
  templateUrl: './spot-image-input.component.html',
  styleUrls: ['./spot-image-input.component.scss']
})
export class SpotImageInputComponent implements OnChanges  {

  @ViewChild('carousel') carousel: NgbCarousel;

  /** 画像初期読み込み */
  @Input() images: ICarousel[];

  /** 画像情報配列の内容が更新されたイベントを発火します。 */
  @Output() updateCarouselInfosEvent: EventEmitter<ICarousel[]> = new EventEmitter();

  /** NgbCarouselに表示している画像データを管理する */
  carouselInfos: ICarousel[] = [];

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnChanges() {
    // 画像初期読み込み
    if (this.images && this.images.length > 0) {
      // 画像情報のマスタの種類を判定する用
      const headImage = _head(this.images);
      // コンポーネント用に変換したオブジェクト格納用
      let pushImage;

      if (headImage.tourismId) {
        // 観光地画像をコンポーネント用のオブジェクトに変換
        pushImage = this.convertTourismImage();

      } else if (headImage.restaurantId) {
        // 飲食店画像をコンポーネント用のオブジェクトに変換
        pushImage = this.convertRestaurantImage();

      } else if (headImage.hotelId) {
        // ホテル画像をコンポーネント用のオブジェクトに変換
        pushImage = this.convertHotelImage();

      } else if (headImage.ActivityId) {
        // アクティビティ画像をコンポーネント用のオブジェクトに変換
        pushImage = this.convertActivityImage();

      }

      // 変換後のオブジェクトをフィールドに格納
      this.carouselInfos = pushImage;
    }
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * ファイルドロップで画像が別タブ表示されないように伝播を止める
   */
  onDragOver(event): void {
    event.preventDefault();
  }

  /**
   * ファイルドロップイベント
   */
  onDrop(event): void {
    // ファイルドロップで画像が別タブ表示されないように伝播を止める
    event.preventDefault();
    this.readFile(event, true);
  }

  /**
   * ファイルドロップゾーンクリックイベント
   * type=file のクリックイベントを呼び出してファイル選択ダイアログを表示します。
   */
  onClickDropZone(): void {
    const fileReader = document.getElementById('file-reader');

    fileReader.onchange = e => {
      this.readFile(e, false);
    };

    fileReader.click();
  }

  /**
   * 画像削除ボタン
   */
  onClickDeleteImage(): void {
    const elements = this.getSlideElements();

    let i = 0;
    _forEach(elements, (e, ii) => {
      if (e.className === 'active') {
        i = ii;
      }
    });

    if (elements.length > 1 && i > 0) {
      // 削除対象の画像の一つ左のスライドを表示する
      this.carousel.select(elements[i - 1].id);
    }

    // アクティブなスライドを削除する
    this.carouselInfos.splice(i, 1);

    // 最新の画像情報配列を親コンポーネントに通知する
    this.updateCarouselInfosEvent.emit(this.carouselInfos);

  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * ファイル読み込み共通処理
   * @param event ファイル読み込みイベント
   * @param isDropEvent ドラッグイベントでの読み込みかどうか true → ドラッグイベント  false → クリックイベント
   */
  private readFile(event, isDropEvent): void {

    let files = null;

    if (isDropEvent) {
      files = event.dataTransfer.files;
    } else {
      files = event.target.files;
    }

    if (files) {
      // ファイル読み込み
      _forEach(files, e => {
        // readerを毎回初期化しないとエラーになる
        const reader = new FileReader();
        reader.onload = (() => {
          const item: ICarousel = {
            inputImageBinary: reader.result,
            newUploadFlg: true,
          };
          this.carouselInfos.push(item);
        });
        reader.readAsDataURL(e);
      });

      // carouselへの読み込みが完了するまでsetTimeout()
      setTimeout(() => {
          // carouselInfosのidを最新化
          const slides = this.getSlideElements();
          _forEach(slides, (e, i) => {
            this.carouselInfos[i].id = e.id;
          });

          // 追加した画像を表示
          const id = this.getCurrentSlideId();
          this.carousel.select(id);

          // 最新の画像情報配列を親コンポーネントに通知する
          this.updateCarouselInfosEvent.emit(this.carouselInfos);
      }, 100);

    }

  }

  /**
   * carouselのスライドの画像表示部のエレメントを返却します。
   */
  private getSlideElements(): NodeListOf<Element> {
    return document.querySelectorAll('ngb-carousel > ol > li');
  }

  /**
   * NgbCarouselのアクティブなIDを返却します。
   *
   * bootstrapのcarouselに一番最後（右側）に追加した画像のslideIdを取得するメソッドが無いため、
   * querySelectorAll()で取得したエレメントから判断。
   */
  private getCurrentSlideId(): string {
    const element = this.getSlideElements();
    if (element.length > 0) {
      return element[element.length - 1].id;
    } else {
      return '';
    }
  }

  /**
   * 観光地画像をコンポーネント用のオブジェクトに変換
   * @returns
   */
   convertTourismImage() {
    const images = [];
    _forEach(this.images, (e: ITourismImage) => {
      const image = {
        // 親コンポーネントで使用する
        tourismId: e.tourismId,
        tourismImageId: e.tourismImageId,
        tourismImageUrl: e.tourismImageUrl,

        // 画像コンポーネントで使用する
        inputImageBinary: e.tourismImageUrl,
        newUploadFlg: false,
      }
      images.push(image);
    });

    return images;
  }

  /**
   * 飲食店画像をコンポーネント用のオブジェクトに変換
   * @returns
   */
  convertRestaurantImage() {
    const images = [];
    _forEach(this.images, (e: IRestaurantImage) => {
      const image = {
        // 親コンポーネントで使用する
        restaurantId: e.restaurantId,
        restaurantImageId: e.restaurantImageId,
        restaurantImageUrl: e.restaurantImageUrl,

        // 画像コンポーネントで使用する
        inputImageBinary: e.restaurantImageUrl,
        newUploadFlg: false,
      }
      images.push(image);
    });

    return images;
  }

  /**
   * ホテル画像をコンポーネント用のオブジェクトに変換
   * @returns
   */
  convertHotelImage() {
    const images = [];
    _forEach(this.images, (e: IHotelImage) => {
      const image = {
        // 親コンポーネントで使用する
        hotelId: e.hotelId,
        hotelImageId: e.hotelImageId,
        hotelImageUrl: e.hotelImageUrl,

        // 画像コンポーネントで使用する
        inputImageBinary: e.hotelImageUrl,
        newUploadFlg: false,
      }
      images.push(image);
    });

    return images;
  }

  /**
   * アクティビティ画像をコンポーネント用のオブジェクトに変換
   * @returns
   */
  convertActivityImage() {
    const images = [];
    _forEach(this.images, (e: IActivityImage) => {
      const image = {
        // 親コンポーネントで使用する
        activityId: e.activityId,
        activityImageId: e.activityImageId,
        activityImageUrl: e.activityImageUrl,

        // 画像コンポーネントで使用する
        inputImageBinary: e.activityImageUrl,
        newUploadFlg: false,
      }
      images.push(image);
    });

    return images;
  }

}
