import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { GridOptions } from 'ag-grid-community';
import { Observable, Subscription, fromEvent, forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { forEach as _forEach, filter as _filter } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { IRoute } from 'src/app/shared/model/route';
import { TourismService } from 'src/app/shared/service/tourism.service';
import { RouteService } from 'src/app/shared/service/route.service';
import { SelectModalService } from 'src/app/shared/component/select-modal/select-modal.service';
import { IRouteDetail } from 'src/app/shared/model/route-detail';
import { Code } from 'src/app/shared/const/code-div.const';
import { RestaurantService } from '../shared/service/restaurant.service';
import { HotelService } from '../shared/service/hotel.service';
import { ActivityService } from '../shared/service/activity.service';

/**
 * スポット一覧ページ 表示モードを表す列挙値
 */
enum PageMode {
  // 通常モード
  Normal = 0,
  // スポット選択モード
  SpotSelect,
}

@Component({
  selector: 'app-show-spot-page',
  templateUrl: './show-spot-page.component.html',
  styleUrls: ['./show-spot-page.component.scss']
})
export class ShowSpotPageComponent implements OnInit, OnDestroy {

  /** スポット一覧ページ 表示モード */
  @Input ('pageMode') pageMode;

  /** リサイズイベント　オブザーバー */
  resizeObservable$: Observable<Event>;

  /** リサイズイベント　購読 */
  resizeSubscription$: Subscription;

  /** グリッド列定義 */
  columnDefs = [
    {
      headerName: '', field: 'editButton', minWidth: '52', maxWidth: '52',
      cellRenderer: (params) => {
        const element = document.createElement('button');
        element.innerHTML = '編集';
        element.className = 'btn btn-outline-info btn-sm';
        element.addEventListener('click', () => {
          if (params.data.tourismId) {
            // 観光地追加ページに遷移
            this.router.navigate(['/add-tourism-page', { tourismId: params.data.tourismId }]);
          } else if (params.data.restaurantId) {
            // 飲食店追加ページに遷移
            this.router.navigate(['/add-restaurant-page', { restaurantId: params.data.restaurantId }]);
          } else if (params.data.hotelId) {
            // ホテル追加ページに遷移
            this.router.navigate(['/add-hotel-page', { tourhotelIdismId: params.data.hotelId }]);
          } else if (params.data.activityId) {
            // アクティビティ追加ページに遷移
            this.router.navigate(['/add-activity-page', { activityId: params.data.activityId }]);
          }          
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
        element.className = 'btn btn-outline-info btn-sm';
        element.addEventListener('click', () => {
          this.selectModal.show('スポットを削除しますか？').then(result => {
            if (result) {
              if (params.data.tourismId) {
                // 観光地を削除
                this.tourismService.deleteTourism(params.data.tourismId).subscribe(() => {
                  this.executeSearch();
                });
              } else if (params.data.restaurantId) {
                // 飲食店を削除
                this.restaurantService.deleteRestaurant(params.data.restaurantId).subscribe(() => {
                  this.executeSearch();
                });
              } else if (params.data.hotelId) {
                // ホテルを削除
                this.hotelService.deleteHotel(params.data.hotelId).subscribe(() => {
                  this.executeSearch();
                });
              } else if (params.data.activityId) {
                // アクティビティを削除
                this.activityService.deleteActivity(params.data.activityId).subscribe(() => {
                  this.executeSearch();
                });
              }
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
    { headerName: '種類', field: 'beanKindDiv', sortable: true, filter: true, tooltipField: 'beanKindDiv', minWidth: '135', maxWidth: '135' },
    { headerName: '国', field: 'country', sortable: true, filter: true, tooltipField: 'country', minWidth: '220', maxWidth: '220' },
    { headerName: 'スポット', field: 'spotName', sortable: true, filter: true, tooltipField: 'spotName', minWidth: '160' },
  ];

  /** ag-gridに表示するチェックボックスのレンダラー */
  checkboxCellRenderer(params): HTMLInputElement {
    if (params.value !== 'Y' && params.value !== 'N') {
      params.setValue(params.value === true || params.value === 'Y' ? 'Y' : 'N');
    } else {
       const input = document.createElement('input');

       input.type = 'checkbox';
       input.value = params.value === true || params.value === 'Y' ? 'Y' : 'N';
       input.checked = params.value === true || params.value === 'Y' ? true : false;

       input.onclick = function() {
         params.setValue(input.checked === true ? 'Y' : 'N');
       };

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
  spotList = [];

  /** スポット追加対象（ルート作成ページから遷移した場合に使用） */
  route: IRoute = {};

  constructor(
    private tourismService: TourismService,
    private restaurantService: RestaurantService,
    private hotelService: HotelService,
    private activityService: ActivityService,
    private routeService: RouteService,
    private selectModal: SelectModalService,
    private router: Router,
    private overlay: Overlay,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  // -----------------------------------------------------------------------
  // ライフライクル

  ngOnInit(): void {
    // リサイズイベントが大量に発生するため、100ms間引いてからグリッドの列幅を調整する
    this.resizeObservable$ = fromEvent(window, 'resize');
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
    if (this.pageMode === PageMode.SpotSelect) {

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

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  // -----------------------------------------------------------------------
  // イベント

  /**
   * スポット登録ボタン押下イベント
   */
  onClickAddTourism(): void {
    this.router.navigate(['/add-tourism-page']);
  }

  /**
   * 飲食店登録ボタン押下イベント
   */
  onClickAddRestaurant(): void {
    this.router.navigate(['/add-restaurant-page']);
  }

  /**
   * ホテル登録ボタン押下イベント
   */
  onClickAddHotel(): void {
    this.router.navigate(['/add-hotel-page']);
  }

  /**
   * アクティビティ登録ボタン押下イベント
   */
  onClickAddActivity(): void {
    this.router.navigate(['/add-activity-page']);
  }

  /**
   * ルート追加ボタン押下イベント
   */
  onClickCreateRoute(): void {
    const route: IRoute = {};
    route.routeDetails = [];

    this.spotList.forEach(e => {
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
    if (this.pageMode === PageMode.SpotSelect) {
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
  private executeSearch(): void {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));

    const searchObservables = [
      this.tourismService.searchTourisms(),
      this.restaurantService.searchRestaurants(),
      this.hotelService.searchHotels(),
      this.activityService.searchActivitys(),
    ];

    const dataList = [];

    forkJoin(searchObservables).subscribe(observables => {
      // results: 各Observables（４つ）
      _forEach(observables, observable => {
        // result: 各検索の結果
        _forEach(observable, result => {
          let data;
          if (result.tourismId) {
            data = {
              beanKindDiv: '観光地',
              tourismId: result.tourismId,
              spotName: result.tourismName,
              country: result.country.countryName,
            }
          } else if (result.restaurantId) {
            data = {
              beanKindDiv: '飲食店',
              restaurantId: result.restaurantId,
              spotName: result.restaurantName,
            }
          } else if (result.hotelId) {
            data = {
              beanKindDiv: 'ホテル',
              hotelId: result.hotelId,
              spotName: result.hotelName,
            }
          } else if (result.activityId) {
            data = {
              beanKindDiv: 'アクティビティ',
              activityId: result.activityId,
              spotName: result.activityName,
            }
          }
          dataList.push(data);
        });
        this.spotList = dataList;
      });
      this.adjustGridColumns();
      // ローディング終了
      this.overlayRef.detach();
    });
  }

  /**
   * グリッドの列幅を調整します。
   */
  adjustGridColumns(): void {
    this.gridOptions.api.sizeColumnsToFit();
  }
}
