import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { forEach as _forEach} from 'lodash';

export interface ICarousel {
  /** NgbCarouselが自動で付与するid */
  id?: string;
  /** 画像バイナリデータ */
  image?: string | ArrayBuffer;
  /** 画像タイトル */
  imageTitle?: string;
}

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent {

  @ViewChild('carousel') carousel: NgbCarousel;

  /** 新しい画像が読み込まれた際にイベントを発火します。 */
  @Output() readFileEvent: EventEmitter<string> = new EventEmitter();

  /** 画面表示用　画像タイトル */
  imageTitle = '';

  /** NgbCarouselに表示している画像データを管理する */
  carouselInfos: ICarousel[] = [];

  constructor() { }

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

  }

  /**
   * carouselスライド変更イベント
   * @param event NgbSlideEvent
   */
  onSlide(event): void {
    _forEach(this.carouselInfos, (e: ICarousel) => {
      if (e.id === event.current) {
        this.imageTitle = e.imageTitle;
      }
    });
  }

  /**
   * 画像のタイトル変更イベント
   * @param event 入力値
   */
  onChangeImageTitle(event): void {

    const currentId = this.getCurrentSlideId();

    _forEach(this.carouselInfos, (e: ICarousel) => {
      if (e.id === currentId) {
        this.imageTitle = event.target.value;
        e.imageTitle = event.target.value;
      }
    });
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
            image: reader.result,
            imageTitle: e.name,
          };
          this.carouselInfos.push(item);
          this.imageTitle = e.name;
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
      }, 100);

      this.readFileEvent.emit();
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

}
