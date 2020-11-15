import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { IRoute } from '../model/route';
import { RouteService } from '../shared/route.service';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-route-page',
  templateUrl: './create-route-page.component.html',
  styleUrls: ['./create-route-page.component.scss']
})
export class CreateRoutePageComponent implements OnInit {

  /** 編集対象 */
  route: IRoute = {};

  /** ルート詳細一覧 */
  routeDetails = [];

  /** 画面上に表示するルート情報のID */
  routeId = '';

  /** ローディングオーバーレイ */
  overlayRef;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private overlay: Overlay,
    private routeService: RouteService,
  ) { }

  // -----------------------------------------------------------------------
  // ライフサイクル

  ngOnInit(): void {
    this.routeId = this.activateRoute.snapshot.paramMap.get('routeId');

    // URLにrouteIdがセットされていない場合、ルート一覧画面にリダイレクト
    if (!this.routeId) {
      this.navigateToShowPage();
      return;
    }

    // ローディング生成
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    // ルートの取得APIリクエスト
    this.routeService.getRoute(this.routeId).subscribe(result => {
      if (result) {
        this.route = result;
        this.routeDetails = this.route.routeDetails;
      } else {
        this.navigateToShowPage('データの取得に失敗しました。');
      }
    }, error => {
      if (error.status === 404) {
        this.navigateToShowPage('データの取得に失敗しました。');
      } else {
        this.navigateToShowPage('サーバーとの通信に失敗しました。');
      }
    }, () => {
      // ローディング終了
      this.overlayRef.detach();
    });

  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * ドロップイベント
   * ルートのリストをドロップした要素に挿入します。
   * @param event CdkDragDrop
   */
  onDropList(event) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  /**
   * スポット追加ボタン押下イベント
   */
  onClickAddSpotButon() {
    // スポット一覧ページに遷移
    this.router.navigate(['/show-container-page', { routeId: this.route.routeId }]);
  }

  /**
   * 移動手段追加ボタン押下イベント
   */
  onClickAddMoveButon() {
    // TODO 実装する
    console.log("onClickAddMoveButon");
  }

  /**
   * 移動手段追加ボタン押下イベント
   */
  onClickAddMealButon() {
    // TODO 実装する
    console.log("onClickAddMealButon");
  }

  /**
   * 移動手段追加ボタン押下イベント
   */
  onClickAddHotelButon() {
    // TODO 実装する
    console.log("onClickAddHotelButon");
  }

  /**
   * 保存ボタン押下イベン
   */
  onClickSave() {
    // TODO 実装する
    console.log("onClickSave");
  }

  /**
   * リストアイテムの削除ボタン押下イベント
   * @param event ルート詳細
   */
  onClickDeleteButton(event) {
    // TODO 実装する
    console.log(event);
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * ルート一覧画面にリダイレクトします。
   * @param errorMessage トーストで表示します。
   */
  navigateToShowPage(errorMessage?) {
    if (errorMessage) {
      this.toastr.error(errorMessage, 'エラー');
    }
    this.router.navigate(['/show-container-page']);
  }

}
