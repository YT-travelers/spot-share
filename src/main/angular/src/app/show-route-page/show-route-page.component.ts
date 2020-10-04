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
import { SelectModalService } from '../shared/select-modal/select-modal.service';
import { InputRouteTitleModalService } from '../shared/input-route-title-modal/input-route-title-modal.service';

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
      headerName: '', field: 'editButton', minWidth: '52', maxWidth: '52',
      cellRenderer: (params) => {
        const element = document.createElement('button');
        element.innerHTML = '編集';
        element.className = 'btn btn-outline-info btn-sm'
        element.addEventListener('click', () => {
          this.router.navigate(['/create-route-page', { id: params.data.id }]);
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
          this.selectModalSevice.show('ルートを削除しますか？').then(result => {
            if (result) {
              this.routeService.deleteRoute(params.data.id).subscribe(result => {
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
    private selectModalSevice: SelectModalService,
    private inputRouteTitleModalService: InputRouteTitleModalService,
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
      this.adjustGridColumns();
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
   * ルート作成ボタン押下イベント
   */
  onClickCreateRoute() {
    // TODO ルートのタイトルをリクエストボディに設定
    this.inputRouteTitleModalService.show().then(result => {
      if (result) {
        // ルート作成リクエスト
        this.routeService.createRoute([]).subscribe(result => {
          // ルート作成ページに遷移
          this.router.navigate(['/create-route-page', { routeId: result.id }]);
        });
      }
    });  


  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 検索処理を実行します。
   */
  private executeSearch() {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.routeService.searchRoutes().subscribe(result => {
      this.routeList = result;
      this.adjustGridColumns();
      // ローディング終了
      this.overlayRef.detach();
    }, () => {
      // ローディング終了
      this.overlayRef.detach();
    });
  }

  /**
   * グリッドの列幅を調整します。
   */
  adjustGridColumns() {
    this.gridOptions.api.sizeColumnsToFit();
  }

}
