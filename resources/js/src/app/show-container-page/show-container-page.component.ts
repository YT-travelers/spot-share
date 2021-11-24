import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowRoutePageComponent } from 'src/app/show-route-page/show-route-page.component';
import { ShowSpotPageComponent } from 'src/app/show-spot-page/show-spot-page.component';
import { Const, TabIndex } from 'src/app/shared/const/const.const';

@Component({
  selector: 'app-show-container-page',
  templateUrl: './show-container-page.component.html',
  styleUrls: ['./show-container-page.component.scss']
})
export class ShowContainerPageComponent implements OnInit {

  /** ルート一覧ページコンポーネント */
  @ViewChild('route') showRoutePageComponent: ShowRoutePageComponent;

  /** スポット一覧ページコンポーネント */
  @ViewChild('spot') ShowSpotPageComponent: ShowSpotPageComponent;

  /** タブの初期選択インデックス */
  selectedIndex: string;

  constructor(private route: ActivatedRoute) {}

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    // 初期表示時に表示するタブを設定する
    const selectedIndex = this.route.snapshot.paramMap.get(Const.SELECT_INDEX);
    switch (selectedIndex) {
      case TabIndex.Route.toString():
        this.selectedIndex = selectedIndex;
        break;
      case TabIndex.Spot.toString():
        this.selectedIndex = selectedIndex;
        break;
      default:
        // 初期値としてルートの一覧を設定する
        this.selectedIndex = TabIndex.Route.toString();
    }
  }

  // -----------------------------------------------------------------------
  // イベント

  selectedIndexChangeEvent(event): void {
    switch (event) {
      case TabIndex.Route:
        this.showRoutePageComponent.adjustGridColumns();
        break;
      case TabIndex.Spot:
        this.ShowSpotPageComponent.adjustGridColumns();
        break;
      default:
        // 何もしない
    }
  }

}
