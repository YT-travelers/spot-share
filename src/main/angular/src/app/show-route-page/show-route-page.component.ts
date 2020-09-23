import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import { Route } from '../entity/route';
import { RouteService } from '../shared/route.service';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { debounceTime } from 'rxjs/operators';
import { ModalService } from '../shared/modal/modal.service';

@Component({
  selector: 'app-show-route-page',
  templateUrl: './show-route-page.component.html',
  styleUrls: ['./show-route-page.component.scss']
})
export class ShowRoutePageComponent implements OnInit {

  /** リサイズイベント　オブザーバー */
  resizeObservable$: Observable<Event>

  /** リサイズイベント　購読 */
  resizeSubscription$: Subscription

  /** グリッド列定義 */
  columnDefs = [
    {
      headerName: '', field: 'editButton', minWidth: '100', maxWidth: '100',
      cellRenderer: (params) => {
        const element = document.createElement('button');
        element.innerHTML = '編集';
        element.className = 'btn btn-outline-info'
        element.addEventListener('click', () => {
          this.modal.show('スポットを削除しますか？').then(result => {
            if (result) {
              this.router.navigate(['/create-route-page', { id: params.data.id }]);
            }
          });          
        });
        return element;
      },
      cellStyle: { 'line-height': '30px', 'text-align': 'center' }
    },
    { headerName: '選択', field: 'select', checkboxSelection: 'true',  minWidth: '65', maxWidth: '65',
      editable: true, 
      cellRenderer: this.checkboxCellRenderer,
      cellStyle: { 'text-align': 'center', 'padding-top': '5px' }
    },
    { headerName: 'id', field: 'id', hide: "true" },
    { headerName: 'ルート名', field: 'routeTitle', sortable: true, filter: true },
  ];


  /** ag-gridに表示するチェックボックスのレンダラー */
  checkboxCellRenderer(params) {
    if(params.value !== 'Y' && params.value !== 'N'){
      params.setValue(params.value === true || params.value === 'Y' ? 'Y' : 'N');
    }else{
       var input = document.createElement("input");
       
       input.type = "checkbox";
       input.value = params.value === true || params.value === 'Y' ? 'Y' : 'N';
       input.checked = params.value === true || params.value === 'Y' ? true : false;
       
       input.onclick = function(){
         params.setValue(input.checked === true ? 'Y' : 'N');
       }
       
       return input;
    }
  }

  /** グリッドオプション */
  gridOptions: GridOptions = <GridOptions> {
    localeText: { noRowsToShow: '表示するデータがありません。' }
  };

  /** ローディングオーバーレイ */
  overlayRef;

  /** スポット一覧（グリッド表示用データ） */
  routeList: Route[] = [];

  constructor(
    private modal: ModalService,
    private routeService: RouteService,
    private router: Router,
    private overlay: Overlay,
  ) {}

  // -----------------------------------------------------------------------
  // ライフライクル

  ngOnInit(): void {
    // リサイズイベントが大量に発生するため、100ms間引いてからグリッドの列幅を調整する
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.
    pipe(
      debounceTime(100)
    ).subscribe(() => {
      this.gridOptions.api.sizeColumnsToFit();
    });

    // ローディング生成
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    // 検索実行
    this.executeSearch();
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * ルート一覧ページ押下イベント
   */
  onClickSpotPage() {
    this.router.navigate(['/show-spot-page']);
  }

  /**
   * ルート作成ボタン押下イベント
   */
  onClickCreateRoute() {
    // ルート作成リクエスト
    this.routeService.createRoute([]).subscribe(result => {
      // ルート作成ページに遷移
      this.router.navigate(['/create-route-page', { routeId: result.id }]);
    });
  }

  /**
   * ルート削除ボタン押下イベント
   */
  onClickDeleteRoute() {
    // TODO 一括削除か1件削除か決まったら実装する　
    // this.routeService.deleteRoute().subscribe(result => {
    //   this.executeSearch();
    // });
  }


  // -----------------------------------------------------------------------
  // 処理

  /**
   * 検索処理を実行します。
   */
  executeSearch() {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.routeService.searchRoutes().subscribe(result => {
      this.routeList = result;
      this.gridOptions.api.sizeColumnsToFit();
      // ローディング終了
      this.overlayRef.detach();
    }, () => {
      // ローディング終了
      this.overlayRef.detach();
    });
  }

}
