import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowRoutePageComponent } from '../show-route-page/show-route-page.component';
import { ShowSpotPageComponent } from '../show-spot-page/show-spot-page.component';

enum tabIndex {
  // ルート一覧
  route = 0,
  // タブ一覧
  spot,
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
  @ViewChild('spot') showSpotPageComponent: ShowSpotPageComponent;

  constructor() { }

  ngOnInit(): void {
  }

  selectedIndexChangeEvent(event) {
    switch (event) {
      case tabIndex.route:
        break;
      case tabIndex.spot:
        break;
      default:
        // 何もしない
    }
  }

}
