import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { FormControl } from '@angular/forms';
import { defer as _defer, remove as _remove, each as _each } from 'lodash';

import { IRoute } from '../model/route';
import { RouteService } from '../shared/route.service';
import { Code } from '../const/code-div.const';

@Component({
  selector: 'app-create-route-page',
  templateUrl: './create-route-page.component.html',
  styleUrls: ['./create-route-page.component.scss']
})
export class CreateRoutePageComponent implements OnInit {

  @ViewChild('routeNameInput') routeNameInput: ElementRef;

  /** 編集対象 */
  route: IRoute = {};

  /** ルート詳細一覧 */
  routeDetails = [];

  /** 画面上に表示するルート情報のID */
  routeId = '';

  /** ルート名称編集中フラグ */
  editRouteName = false;

  /** ルート名称 */
  routeName = new FormControl(this.route.routeName);

  /** ローディングオーバーレイ */
  overlayRef;

  /** ビーン種類区分 */
  beanKindDiv = Code.BeanKindDiv;

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
        this.routeName.setValue(this.route.routeName);
      } else {
        this.navigateToShowPage('データの取得に失敗しました。');
      }
      this.overlayRef.detach();
    }, error => {
      if (error.status === 404) {
        this.navigateToShowPage('データの取得に失敗しました。');
      } else {
        this.navigateToShowPage('サーバーとの通信に失敗しました。');
      }
      this.overlayRef.detach();
    });

  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * ルート名称編集ボタン
   */
  onClickRouteNameEditButton() {
    this.editRouteName = true;
    _defer (() => {
      this.routeNameInput.nativeElement.focus();
    });
  }

  /**
   * ルート名称blurイベント
   */
  onBlurRouteName() {
    this.route.routeName = this.routeName.value;
    this.editRouteName = false;
  }

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
  onClickAddTourismButon() {
    // スポット一覧ページに遷移
    this.router.navigate(['/show-container-page', { routeId: this.route.routeId }]);
  }

  // /**
  //  * 移動手段追加ボタン押下イベント
  //  */
  // onClickAddMoveButon() {
  //   // TODO 実装する
  //   console.log("onClickAddMoveButon");
  // }

  // /**
  //  * 移動手段追加ボタン押下イベント
  //  */
  // onClickAddMealButon() {
  //   // TODO 実装する
  //   console.log("onClickAddMealButon");
  // }

  // /**
  //  * 移動手段追加ボタン押下イベント
  //  */
  // onClickAddHotelButon() {
  //   // TODO 実装する
  //   console.log("onClickAddHotelButon");
  // }
  
  /**
   * ビーン更新イベント
   * @param event ルート詳細
   */
  onUpdateRouteDetailEvent(event) {
    // 引数のrouteDetailIdの要素を、引数で更新する
     const idx = _each(this.routeDetails, e => {
      if (e.routeDetailId = event.routeDetailId) {
        // TODO 動作未確認。breakもできているか確認する。
        e = event;
        return false;
      }
    });
  }

  /**
   * ビーン削除ボタン押下イベント
   * @param event ルート詳細ID
   */
  onDeleteRouteDetailEvent(event) {
    _remove(this.routeDetails, (e) => {
      return e.routeDetailId === event;
    });
  }

  /**
   * 保存ボタン押下イベント
   */
  onClickSave() {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.routeService.updateRoute(this.route, this.route.routeId).subscribe(() => {
      this.toastr.success('保存が完了しました。', '成功');
      this.overlayRef.detach();
    }, () => {
      this.toastr.error('保存が出来ませんでした。', 'エラー');
      this.overlayRef.detach();
    });
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
