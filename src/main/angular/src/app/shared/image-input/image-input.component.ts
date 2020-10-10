import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { forEach as _forEach} from 'lodash';

@Component({
  selector: 'share-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent {

  @ViewChild('carousel') carousel: NgbCarousel;

  /** 新しい画像が読み込まれた際にイベントを発火します。 */
  @Output() readFileEvent: EventEmitter<string> = new EventEmitter();

  /** 画面表示用　画像タイトル */
  dispImageTitle = '';

  /** 画像タイトル */
  imageTitles = [];

  /** 画像のバイナリファイル */
  images = [];

  constructor() { }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * ファイルドロップで画像が別タブ表示されないように伝播を止める
   * @param event 
   */
  onDragOver(event) {
    event.preventDefault();
  }

  /**
   * ファイルドロップイベント
   */
  onDrop(event) {  
    // ファイルドロップで画像が別タブ表示されないように伝播を止める
    event.preventDefault();
    this.readFile(event, true);
  }

  /**
   * ファイルドロップゾーンクリックイベント
   * type=file のクリックイベントを呼び出してファイル選択ダイアログを表示します。
   * @param event 
   */
  onClickDropZone() {
    const fileReader = document.getElementById('file-reader')
    
    fileReader.onchange = e => {
      this.readFile(e, false);
    }

    fileReader.click();
  }

  /**
   * 画像削除ボタン
   */
  onClickDeleteImage() {
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
    this.imageTitles.splice(i, 1);
    this.images.splice(i, 1);

  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * ファイル読み込み共通処理
   * @param event ファイル読み込みイベント
   * @param isDropEvent ドラッグイベントでの読み込みかどうか true → ドラッグイベント  false → クリックイベント
   */
  private readFile(event, isDropEvent) {

    let file = null;

    if (isDropEvent) {
      file = event.dataTransfer.files[0];
    } else {
      file = event.target.files[0];
    }
    
    const reader = new FileReader();
    const images = this.images;

    reader.addEventListener("load", function () {
      // carouselに画像を追加する
      images.push(reader.result);
    }, false);

    if(file) {
      reader.readAsDataURL(file);
      this.imageTitles.push(file.name);
      this.dispImageTitle = file.name;
      this.readFileEvent.emit();

      // bootstrapのcarouselに一番最後（右側）に追加した画像のslideIdを取得するメソッドが無いため、
      // carouselへの読み込みが完了するまでsetTimeout()した後、querySelectorAll()で取得しselect()で表示する。
      setTimeout(() => {
        const element = this.getSlideElements();
        if (element.length > 0) {
          this.carousel.select(element[element.length - 1].id);
        }
      }, 100);
    }

  }

  /**
   * carouselのスライドの画像表示部のエレメントを返却します。
   */
  private getSlideElements() {
    return document.querySelectorAll('ngb-carousel > ol > li');
  }

}
