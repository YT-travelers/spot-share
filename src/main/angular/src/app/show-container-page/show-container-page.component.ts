import { Component, ViewChild } from '@angular/core';
import { ShowRoutePageComponent } from 'src/app/show-route-page/show-route-page.component';
import { ShowSpotPageComponent } from 'src/app/show-spot-page/show-spot-page.component';

/**
 * 一覧ページ タブのインデックスを表す列挙値
 */
enum TabIndex {
  // ルート一覧
  Route = 0,
  // タブ一覧
  Tourism,
}

@Component({
  selector: 'app-show-container-page',
  templateUrl: './show-container-page.component.html',
  styleUrls: ['./show-container-page.component.scss']
})
export class ShowContainerPageComponent {

  /** ルート一覧ページコンポーネント */
  @ViewChild('route') showRoutePageComponent: ShowRoutePageComponent;

  /** スポット一覧ページコンポーネント */
  @ViewChild('tourism') ShowSpotPageComponent: ShowSpotPageComponent;

  /** タブの初期選択インデックス */
  selectedIndex;

  constructor() {}

  selectedIndexChangeEvent(event): void {
    switch (event) {
      case TabIndex.Route:
        this.showRoutePageComponent.adjustGridColumns();
        break;
      case TabIndex.Tourism:
        this.ShowSpotPageComponent.adjustGridColumns();
        break;
      default:
        // 何もしない
    }
  }

}
