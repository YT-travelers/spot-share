import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowRoutePageComponent } from '../show-route-page/show-route-page.component';
import { ShowTourismPageComponent } from '../show-tourism-page/show-tourism-page.component';

/**
 * 一覧ページ タブのインデックスを表す列挙値
 */
enum TabIndex {
  // ルート一覧
  Route = 0,
  // タブ一覧
  Tourism,
}

/**
 * 一覧ページ 表示モードを表す列挙値
 */
enum PageMode {
  // 通常モード
  Normal = 0,
  // スポット選択モード
  TourismSelect,
}

@Component({
  selector: 'app-show-container-page',
  templateUrl: './show-container-page.component.html',
  styleUrls: ['./show-container-page.component.scss']
})
export class ShowContainerPageComponent implements OnInit {

  /** ルート一覧ページコンポーネント */
  @ViewChild('route') showRoutePageComponent: ShowRoutePageComponent;

  /** スポット一覧ページコンポーネント */
  @ViewChild('tourism') showTourismPageComponent: ShowTourismPageComponent;

  /** タブの初期選択インデックス */
  selectedIndex

  /** スポット一覧ページ 表示モード（HTML用） */
  _pageMode = PageMode;

  /** スポット一覧ページ 表示モード */
  pageMode: PageMode = PageMode.Normal;

  constructor(
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(paramsMap => {
      const routeId = paramsMap.get('routeId');
      if (!routeId) {
        // URLパラメータに routeId が設定されていない場合「通常モード」で画面を表示
        this.pageMode = PageMode.Normal;
      } else {
        // URLパラメータに routeId が設定されている場合「スポット選択モード」で画面を表示
        this.pageMode = PageMode.TourismSelect;
      }
    })
  }

  selectedIndexChangeEvent(event) {
    switch (event) {
      case TabIndex.Route:
        this.showRoutePageComponent.adjustGridColumns();
        break;
      case TabIndex.Tourism:
        this.showTourismPageComponent.adjustGridColumns();
        break;
      default:
        // 何もしない
    }
  }

}
