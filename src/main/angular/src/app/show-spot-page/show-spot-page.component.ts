import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { GridOptions } from 'ag-grid-community';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Spot } from '../entity/spot';
import { SpotService } from '../shared/spot.service'
import { RouteService } from '../shared/route.service';

@Component({
  selector: 'show-spot-page',
  templateUrl: './show-spot-page.component.html',
  styleUrls: ['./show-spot-page.component.scss']
})
export class ShowSpotPageComponent implements OnInit {

  /** リサイズイベント　オブザーバー */
  resizeObservable$: Observable<Event>

  /** リサイズイベント　購読 */
  resizeSubscription$: Subscription

  /**
   * グリッドAPI 
   * @see https://www.ag-grid.com/javascript-grid-api/
   */
  gridApi

  /** グリッド列定義 */
  columnDefs = [
    {
      headerName: '', field: 'editButton', minWidth: '100', maxWidth: '100',
      cellRenderer: (params) => {
        const element = document.createElement('button');
        element.innerHTML = '編集';
        element.className = 'btn btn-outline-info'
        element.addEventListener('click', () => {
          // TODO 画面遷移前に確認ダイアログを表示する
          this.router.navigate(['/add-spot-page', { id: params.data.id }]);
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
    { headerName: 'ルート番号', field: 'routetNumber', sortable: true, filter: true },
    { headerName: 'スケジュール日時', field: 'scheduleDateTime', sortable: true, filter: true },
    { headerName: '国', field: 'country', sortable: true, filter: true, tooltipField: 'country' },
    { headerName: '観光地名', field: 'spotName', sortable: true, filter: true, tooltipField: 'spotName' },
    { headerName: '費用（予算）', field: 'costExpectation', sortable: true, filter: true, tooltipField: 'costExpectation' },
    { headerName: '所要時間（予想）', field: 'requiredTimeExpectation', sortable: true, filter: true, tooltipField: 'requiredTimeExpectation' },
    { headerName: '行きたい度', field: 'favoritePoint', sortable: true, filter: true, tooltipField: 'favoritePoint' },
    { headerName: 'URL', field: 'url', sortable: true, filter: true, tooltipField: 'url' },
    { headerName: '備考', field: 'remark', sortable: true, filter: true, tooltipField: 'remark' },
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
  spotList: Spot[] = [];
  
  /** 検索キーワード */ 
  searchKeyword = new FormControl('');

  constructor(
    private spotService: SpotService,
    private routeService: RouteService,
    private router: Router,
    private overlay: Overlay,
  ) {}

  // -----------------------------------------------------------------------
  // ライフライクル

  ngOnInit() {
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
   * グリッド準備完了通知
   */
  onGridReady(params) {
    this.gridApi = params.api;
  }

  /**
   * 検索ボタン押下イベント
   */
  onClickSearch() {
    this.executeSearch();
  }

  /**
   * スポット登録ボタン押下イベント
   */
  onClickAddSpot() {
    this.router.navigate(['/add-spot-page']);
  }

  /**
   * ルート追加ボタン押下イベント
   */
  onClickCreateRoute() {
    const route = [];
    this.spotList.forEach(e => {
      if (e['select'] === 'Y') {
        route.push(e.id);
      }
    });
    // ルート作成リクエスト
    this.routeService.createRoute(route).subscribe(result => {
      // ルート作成ページに遷移
      this.router.navigate(['/creat e-route-page', { routeId: result.id }]);
    });
  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 検索処理を実行します。
   */
  executeSearch() {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.spotService.searchSpots(this.searchKeyword.value).subscribe(result => {
      this.spotList = result;
      this.gridOptions.api.sizeColumnsToFit();
      // ローディング終了
      this.overlayRef.detach();
    });
  }
}
