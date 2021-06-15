import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { FormControl } from '@angular/forms';
import { defer as _defer, remove as _remove, each as _each, forEach as _forEach } from 'lodash';

import { IRoute } from 'src/app/shared/model/route';
import { RouteService } from 'src/app/shared/service/route.service';
import { Code } from 'src/app/shared/const/code-div.const';
import { IRouteDetail } from 'src/app/shared/model/route-detail';

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
  routeDetails: IRouteDetail[] = [];

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
   * 戻るボタン押下イベント
   */
  onClickBack() {
    // TODO
  }

  /**
   * ルート名称編集ボタン
   */
  onClickRouteNameEditButton(): void {
    this.editRouteName = true;
    _defer (() => {
      this.routeNameInput.nativeElement.focus();
    });
  }

  /**
   * ルート名称blurイベント
   */
  onBlurRouteName(): void {
    this.route.routeName = this.routeName.value;
    this.editRouteName = false;
  }

  /**
   * ドロップイベント
   * ルートのリストをドロップした要素に挿入します。
   * @param event CdkDragDrop
   */
  onDropList(event): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  /**
   * 観光地追加ボタン押下イベント
   */
  onClickAddTourismButon(): void {
    // 観光地一覧ページに遷移
    this.router.navigate(['/show-container-page', { routeId: this.route.routeId }]);
  }

  /**
   * 移動手段追加ボタン押下イベント
   */
  onClickAddMoveButon(): void {
    this.addRouteBean(Code.BeanKindDiv.Move);
  }

  /**
   * 食事追加ボタン押下イベント
   */
  onClickAddMealButon(): void {
    this.addRouteBean(Code.BeanKindDiv.Meal);
  }

  /**
   * チェックリスト追加ボタン押下イベント
   */
  onClickAddChcklistButon(): void {
    this.addRouteBean(Code.BeanKindDiv.Checklist);
  }

  /**
   * メモ追加ボタン押下イベント
   */
  onClickAddMemoButon(): void {
    this.addRouteBean(Code.BeanKindDiv.Memo);
  }

  /**
   * ビーン更新イベント
   * @param event ルート詳細
   */
  onUpdateRouteDetailEvent(event): void {
    // 引数のrouteDetailIdの要素を、引数で更新する
    _each(this.routeDetails, (e: IRouteDetail, i: number, a: IRouteDetail[]) => {
      if (e.routeDetailId === event.routeDetailId) {
        switch (e.beanKindDiv) {
          case Code.BeanKindDiv.Tourism: a[i].routeDetailTourism = event;
            break;
          case Code.BeanKindDiv.Restaurant: a[i].routeDetailRestaurant = event;
            break;
          case Code.BeanKindDiv.Hotel: a[i].routeDetailHotel = event;
            break;
          case Code.BeanKindDiv.Activity: a[i].routeDetailActivity = event;
            break;
          case Code.BeanKindDiv.Meal: a[i].routeDetailMeal = event;
            break;
          case Code.BeanKindDiv.Move: a[i].routeDetailMove = event;
            break;
          case Code.BeanKindDiv.Time: a[i].routeDetailTime = event;
            break;
          case Code.BeanKindDiv.Checklist: a[i].routeDetailChecklist = event;
            break;
          case Code.BeanKindDiv.Memo: a[i].routeDetailMemo = event;
            break;
        }
        return false;
      }
    });
  }

  /**
   * ビーン削除ボタン押下イベント
   * @param event ルート詳細ID
   */
  onDeleteRouteDetailEvent(event): void {
    _remove(this.routeDetails, e => {
      return e.routeDetailId === event;
    });
  }

  /**
   * 保存ボタン押下イベント
   */
  onClickSave(): void {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    // 編集内容を格納
    this.route.routeDetails = this.routeDetails;

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
  navigateToShowPage(errorMessage?): void {
    if (errorMessage) {
      this.toastr.error(errorMessage, 'エラー');
    }
    this.router.navigate(['/show-container-page']);
  }

  /**
   * ルートにビーンを追加します。
   */
  addRouteBean(beanKindDiv): void {
    // ルート詳細IDを仮採番（正式にはバック側で採番される）
    const routeDetailId = this.getMaxRouteDetailId();

    // 初期値設定
    const routeBean: IRouteDetail = {
      routeDetailId: routeDetailId,
      beanKindDiv: beanKindDiv,
      routeDetailMove: {},
      routeDetailMeal: {},
      routeDetailMemo: {},
      routeDetailChecklist: {}
    };

    // 初期値設定（仮採番されたルート詳細ID）
    switch (beanKindDiv) {
      case Code.BeanKindDiv.Move: routeBean.routeDetailMove.routeDetailId = routeDetailId;
        break;
      case Code.BeanKindDiv.Meal: routeBean.routeDetailMeal.routeDetailId = routeDetailId;
        break;
      case Code.BeanKindDiv.Memo: routeBean.routeDetailMemo.routeDetailId = routeDetailId;
        break;
      case Code.BeanKindDiv.Checklist: routeBean.routeDetailChecklist.routeDetailId = routeDetailId;
        break;
    }

    this.routeDetails.push(routeBean);
  }

  /**
   * this.routeDetails配列の中で一番大きいrouteDetailIdを返却します。
   */
  getMaxRouteDetailId(): number {
    let routeDetailId = 1;
    _forEach(this.routeDetails, e => {
      if (e.routeDetailId > routeDetailId) {
        routeDetailId = e.routeDetailId;
      }
    });

    return routeDetailId + 1;
  }
}
