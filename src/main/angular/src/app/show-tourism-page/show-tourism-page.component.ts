import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { GridOptions } from 'ag-grid-community';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { forEach as _forEach, filter as _filter } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { ITourism } from 'src/app/model/tourism';
import { IRoute } from 'src/app/model/route';
import { TourismService } from 'src/app/shared/tourism.service'
import { RouteService } from 'src/app/shared/route.service';
import { SelectModalService } from 'src/app/shared/select-modal/select-modal.service';
import { IRouteDetail } from 'src/app/model/route-detail';
import { Code } from 'src/app/const/code-div.const';

/**
 * スポット一覧ページ 表示モードを表す列挙値
 */
enum PageMode {
  // 通常モード
  Normal = 0,
  // スポット選択モード
  TourismSelect,
}

@Component({
  selector: 'app-show-tourism-page',
  templateUrl: './show-tourism-page.component.html',
  styleUrls: ['./show-tourism-page.component.scss']
})
export class ShowTourismPageComponent implements OnInit, OnDestroy {

  /** スポット一覧ページ 表示モード */
  @Input ('pageMode') pageMode;

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
          this.router.navigate(['/add-tourism-page', { tourismId: params.data.tourismId }]);
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
          this.selectModal.show('スポットを削除しますか？').then(result => {
            if (result) {
              this.tourismService.deleteTourism(params.data.tourismId).subscribe(() => {
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
    { headerName: '国', field: 'country.countryName', sortable: true, filter: true, tooltipField: 'country', minWidth: '160' },
    { headerName: '観光地名', field: 'tourismName', sortable: true, filter: true, tooltipField: 'tourismName', minWidth: '160' },
    { headerName: '営業開始時間', field: 'tourismOpenTime', sortable: true, filter: true, tooltipField: 'tourismOpenTime', minWidth: '160' },
    { headerName: '営業終了時間', field: 'tourismCloseTime', sortable: true, filter: true, tooltipField: 'tourismCloseTime', minWidth: '160' },
    { headerName: 'URL', field: 'tourismUrl', sortable: true, filter: true, tooltipField: 'tourismUrl', minWidth: '160' },
    { headerName: '概要', field: 'tourismSummary', sortable: true, filter: true, tooltipField: 'tourismSummary', minWidth: '160' },
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
  tourismList: ITourism[] = [];

  /** スポット追加対象（ルート作成ページから遷移した場合に使用） */
  route: IRoute = {};

  constructor(
    private tourismService: TourismService,
    private routeService: RouteService,
    private selectModal: SelectModalService,
    private router: Router,
    private overlay: Overlay,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
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
      this.adjustGridColumns();
    });

    // ローディング生成
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    // 検索実行
    this.executeSearch();

    // スポット選択モードの場合
    if (this.pageMode === PageMode.TourismSelect) {

      // グリッドから編集ボタンと削除ボタンを削除
      this.columnDefs = _filter(this.columnDefs, e => {
        if (e.field === 'editButton' || e.field === 'deleteButton') {
          return false;
        }
        return true;
      });

      // URLからスポットを追加するルートIDを取得
      const routeId = this.activateRoute.snapshot.paramMap.get('routeId');

      // スポット追加対象のルートを取得する
      this.routeService.getRoute(routeId).subscribe(result => {
        if (result) {
          this.route = result;
        }
      }, error => {
        // エラーの場合はルート作成ページに返す
        this.toastr.error('ルートの取得に失敗しました。'　+ error.status + '：' + error.statusText, 'エラー');
        this.router.navigate(['/show-container-page']);
      });
    }
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * スポット登録ボタン押下イベント
   */
  onClickAddTourism() {
    this.router.navigate(['/add-tourism-page']);
  }

  /**
   * 飲食店登録ボタン押下イベント
   */
  onClickAddRestaurant() {
    this.router.navigate(['/add-restaurant-page']);
  }

  /**
   * ホテル登録ボタン押下イベント
   */
  onClickAddHotel() {
    this.router.navigate(['/add-hotel-page']);
  }

  /**
   * アクティビティ登録ボタン押下イベント
   */
  onClickAddActivity() {
    this.router.navigate(['/add-activity-page']);
  }

  /**
   * ルート追加ボタン押下イベント
   */
  onClickCreateRoute() {
    const route: IRoute = {};
    route.routeDetails = [];

    this.tourismList.forEach(e => {
      if (e['select'] === 'Y') {
        route.routeDetails.push(
          {
            routeDetailId: null,
            beanKindDiv: Code.BeanKindDiv.Tourism,
            routeDetailTourism: { tourismId: e.tourismId }
          }
        );
      }
    });

    // チェックボックスが一つも選択されていない場合
    if (route.routeDetails.length === 0) {
      this.selectModal.show('ルートに追加するスポットが１つも選択されていません。', true).then(() => {
        // 何もしない
      });

      // 後続の処理は行わない
      return;
    }

    // 新規作成、または更新
    if (this.pageMode == PageMode.TourismSelect) {
      // スポット選択モードの場合
      _forEach(route.routeDetails, (addTourism: IRouteDetail) => {
        this.route.routeDetails.push(addTourism);
      });

      // 更新
      this.routeService.updateRoute(this.route, this.route.routeId).subscribe(result => {
        // ルート作成ページに遷移
        this.router.navigate(['/create-route-page', { routeId: result.routeId }]);
      });
    } else {
      // 通常モードの場合、新規作成
      this.routeService.createRoute(route).subscribe(result => {
        // ルート作成ページに遷移
        this.router.navigate(['/create-route-page', { routeId: result.routeId }]);
      });
    }

  }

  // -----------------------------------------------------------------------
  // 処理

  /**
   * 検索処理を実行します。
   */
  private executeSearch() {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.tourismService.searchTourisms().subscribe(result => {
      this.tourismList = result;
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
