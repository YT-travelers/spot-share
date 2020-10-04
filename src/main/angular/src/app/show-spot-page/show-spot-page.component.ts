import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { GridOptions } from 'ag-grid-community';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Spot } from '../entity/spot';
import { SpotService } from '../shared/spot.service'
import { RouteService } from '../shared/route.service';
import { ModalService } from '../shared/modal/modal.service';

@Component({
  selector: 'app-show-spot-page',
  templateUrl: './show-spot-page.component.html',
  styleUrls: ['./show-spot-page.component.scss']
})
export class ShowSpotPageComponent implements OnInit {

  /** リサイズイベント　オブザーバー */
  resizeObservable$: Observable<Event>

  /** リサイズイベント　購読 */
  resizeSubscription$: Subscription

  /** グリッド列定義 */
  columnDefs = [
    {
      headerName: '', field: 'editButton', minWidth: '52', maxWidth: '52',
      cellRenderer: (params) => {
        const element = document.createElement('button');
        element.innerHTML = '編集';
        element.className = 'btn btn-outline-info btn-sm'
        element.addEventListener('click', () => {
          this.router.navigate(['/add-spot-page', { id: params.data.id }]);
        });
        return element;
      },
      cellStyle: { 'line-height': '30px', 'text-align': 'center', 'padding': '3px' }
    },
    {
      headerName: '', field: 'deleteButton', minWidth: '52', maxWidth: '52',
      cellRenderer: (params) => {
        const element = document.createElement('button');
        element.innerHTML = '削除';
        element.className = 'btn btn-outline-info btn-sm'
        element.addEventListener('click', () => {
          this.modal.show('スポットを削除しますか？').then(result => {
            if (result) {
              this.spotService.deleteSpot(params.data.id).subscribe(result => {
                this.executeSearch();
              });
            }
          });
        });
        return element;
      },
      cellStyle: { 'line-height': '30px', 'text-align': 'center', 'padding': '3px' }
    },
    { headerName: '選択', field: 'select', checkboxSelection: 'true',  minWidth: '65', maxWidth: '65',
      editable: true, 
      cellRenderer: this.checkboxCellRenderer,
      cellStyle: { 'text-align': 'center', 'padding-top': '5px' }
    },
    { headerName: 'id', field: 'id', hide: "true" },
    { headerName: '国', field: 'country', sortable: true, filter: true, tooltipField: 'country', minWidth: '160' },
    { headerName: '観光地名', field: 'spotName', sortable: true, filter: true, tooltipField: 'spotName', minWidth: '160' },
    { headerName: '費用（予算）', field: 'costExpectation', sortable: true, filter: true, tooltipField: 'costExpectation', minWidth: '160' },
    { headerName: '所要時間（予想）', field: 'requiredTimeExpectation', sortable: true, filter: true, tooltipField: 'requiredTimeExpectation', minWidth: '160' },
    { headerName: 'URL', field: 'url', sortable: true, filter: true, tooltipField: 'url', minWidth: '160' },
    { headerName: '備考', field: 'remark', sortable: true, filter: true, tooltipField: 'remark', minWidth: '160' },
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

  constructor(
    private spotService: SpotService,
    private routeService: RouteService,
    private modal: ModalService,
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

    if (route.length > 0) {
      // ルート作成リクエスト
      this.routeService.createRoute(route).subscribe(result => {
        // ルート作成ページに遷移
        this.router.navigate(['/create-route-page', { routeId: result.id }]);
      });
    } else {
      this.modal.show('ルートに追加するスポットが１つも選択されていません。', true).then(() => {
        // 何もしない
      });
    }

  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 検索処理を実行します。
   */
  executeSearch() {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.spotService.searchSpots().subscribe(result => {
      this.spotList = result;
      this.gridOptions.api.sizeColumnsToFit();
      // ローディング終了
      this.overlayRef.detach();
    }, () => {
      // ローディング終了
      this.overlayRef.detach();
    });
  }
}
