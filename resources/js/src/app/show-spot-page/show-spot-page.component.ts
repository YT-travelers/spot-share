import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { GridOptions } from 'ag-grid-community';
import { Observable, Subscription, fromEvent, forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { forEach as _forEach, filter as _filter } from 'lodash';

import { Code } from 'src/app/shared/const/code-div.const';
import { IRoute } from 'src/app/shared/model/route';
import { IRouteDetail } from 'src/app/shared/model/route-detail';
import { ITourism } from 'src/app/shared/model/tourism';
import { IRestaurant } from 'src/app/shared/model/restaurant';
import { IHotel } from 'src/app/shared/model/hotel';
import { IActivity } from 'src/app/shared/model/activity';

import { RouteService } from 'src/app/shared/service/route.service';
import { TourismService } from 'src/app/shared/service/tourism.service';
import { RestaurantService } from 'src/app/shared/service/restaurant.service';
import { HotelService } from 'src/app/shared/service/hotel.service';
import { ActivityService } from 'src/app/shared/service/activity.service';
import { SelectModalService } from 'src/app/shared/component/select-modal/select-modal.service';
import { InputRouteNameModalService } from '../shared/component/input-route-name-modal/input-route-name-modal.service';

@Component({
  selector: 'app-show-spot-page',
  templateUrl: './show-spot-page.component.html',
  styleUrls: ['./show-spot-page.component.scss']
})
export class ShowSpotPageComponent implements OnInit, OnDestroy {

  /** スポット一覧ページ 表示モード */
  @Input ('spotSelectMode') spotSelectMode: boolean;

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
            this.router.navigate(['/add-hotel-page', { hotelId: params.data.hotelId }]);
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
      editable: false,
      cellRenderer: this.checkboxCellRenderer,
      cellStyle: { 'text-align': 'center', 'padding-top': '5px' }
    },
    { headerName: '種類', field: 'beanKindDivName', sortable: true, filter: true, tooltipField: 'beanKindDivName', minWidth: '135', maxWidth: '135' },
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

  constructor(
    private tourismService: TourismService,
    private restaurantService: RestaurantService,
    private hotelService: HotelService,
    private activityService: ActivityService,
    private routeService: RouteService,
    private selectModal: SelectModalService,
    private inputrouteNameModalService: InputRouteNameModalService,
    private router: Router,
    private overlay: Overlay,
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
    if (this.spotSelectMode) {

      // グリッドから編集ボタンと削除ボタンを削除
      this.columnDefs = _filter(this.columnDefs, e => {
        if (e.field === 'editButton' || e.field === 'deleteButton') {
          return false;
        }
        return true;
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
    const routeDetails = this.createRouteObject();

    // チェックボックスが一つも選択されていない場合
    if (routeDetails.length === 0) {
      this.selectModal.show('ルートに追加するスポットが１つも選択されていません。', true).then(() => {
        // 何もしない
      });

      // 後続の処理は行わない
      return;
    }

    // 新規ルート作成
    this.inputrouteNameModalService.show().then(routeName => {
      if (routeName) {

        const route: IRoute = { routeDetails: routeDetails };
        route.routeName = routeName;

        // ルート作成リクエスト
        this.routeService.createRoute(route).subscribe(response => {
          // ルート作成ページに遷移
          this.router.navigate(['/create-route-page', { routeId: response.routeId }]);
        });
      }
    });
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
            const tourism: ITourism = result;
            data = {
              beanKindDiv: Code.BeanKindDiv.Tourism,
              beanKindDivName: Code.BeanKindDivName.Tourism,
              tourismId: tourism.tourismId,
              spotName: tourism.tourismName,
              country: tourism.country.countryName,
              openTimeHour: tourism.tourismOpenTimeHours,
              openTimeMinute: tourism.tourismOpenTimeMinutes,
              closeTimeHour: tourism.tourismCloseTimeHours,
              closeTimeMinute: tourism.tourismCloseTimeMinutes,
            }
          } else if (result.restaurantId) {
            const restaurant: IRestaurant = result;
            data = {
              beanKindDiv: Code.BeanKindDiv.Restaurant,
              beanKindDivName: Code.BeanKindDivName.Restaurant,
              restaurantId: restaurant.restaurantId,
              spotName: restaurant.restaurantName,
              openTimeHour: restaurant.restaurantOpenTimeHours,
              openTimeMinute: restaurant.restaurantOpenTimeMinutes,
              closeTimeHour: restaurant.restaurantCloseTimeHours,
              closeTimeMinute: restaurant.restaurantCloseTimeMinutes,
            }
          } else if (result.hotelId) {
            const hotel: IHotel = result;
            data = {
              beanKindDiv: Code.BeanKindDiv.Hotel,
              beanKindDivName: Code.BeanKindDivName.Hotel,
              hotelId: hotel.hotelId,
              spotName: hotel.hotelName,
            }
          } else if (result.activityId) {
            const activity: IActivity = result;
            data = {
              beanKindDiv: Code.BeanKindDiv.Activity,
              beanKindDivName: Code.BeanKindDivName.Activity,
              activityId: activity.activityId,
              spotName: activity.activityName,
              openTimeHour: activity.activityOpenTimeHours,
              openTimeMinute: activity.activityOpenTimeMinutes,
              closeTimeHour: activity.activityCloseTimeHours,
              closeTimeMinute: activity.activityCloseTimeMinutes,
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

  /**
   * チェックボックスにチェックをつけているスポットをrouteDetailsに格納したIRouteオブジェクトを返却します。
   * @returns
   */
  private createRouteObject(): IRouteDetail[] {
    const routeDetails = [];

    _forEach(this.spotList, gridData => {
      if (gridData['select'] === 'Y') {
        let routeDetail: IRouteDetail;
        if (gridData.tourismId) {
          // 観光地
          routeDetail = this.createRouteDetailToursimObject(gridData);
        } else if (gridData.restaurantId) {
          // 飲食店
          routeDetail = this.createRouteDetailRestaurantObject(gridData);
        } else if (gridData.hotelId) {
          // ホテル
          routeDetail = this.createRouteDetailHotelObject(gridData);
        } else if (gridData.activityId) {
          // アクティビティ
          routeDetail = this.createRouteDetailActivityObject(gridData);
        }
        routeDetails.push(routeDetail);
      }
    });

    return routeDetails;
  }

  /**
   * グリッドで選択された行データから「ルート詳細観光地」オブジェクトに作成します。
   * @param gridData 
   * @returns 
   */
  private createRouteDetailToursimObject(gridData): IRouteDetail {
    const routeDetail: IRouteDetail = {
      routeDetailId: null,
      beanKindDiv: Code.BeanKindDiv.Tourism,
      routeDetailTourism: {
        tourismId: gridData.tourismId,
        tourism: {
          tourismName: gridData.spotName,
          tourismOpenTimeHours: gridData.openTimeHour,
          tourismOpenTimeMinutes: gridData.openTimeMinute,
          tourismCloseTimeHours: gridData.closeTimeHour,
          tourismCloseTimeMinutes: gridData.closeTimeMinute,
        }
      }
    };

    return routeDetail;
  }

  /**
   * グリッドで選択された行データから「ルート詳細飲食店」オブジェクトに作成します。
   * @param gridData 
   * @returns 
   */
  private createRouteDetailRestaurantObject(gridData): IRouteDetail  {
    const routeDetail: IRouteDetail = {
      routeDetailId: null,
      beanKindDiv: gridData.beanKindDiv,
      routeDetailRestaurant: {
        restaurantId: gridData.restaurantId,
        restaurant: {
          restaurantName: gridData.spotName,
          restaurantOpenTimeHours: gridData.openTimeHour,
          restaurantOpenTimeMinutes: gridData.openTimeMinute,
          restaurantCloseTimeHours: gridData.closeTimeHour,
          restaurantCloseTimeMinutes: gridData.closeTimeMinute,
        }
      }
    };

    return routeDetail;
  }

  /**
   * グリッドで選択された行データから「ルート詳細ホテル」オブジェクトに作成します。
   * @param gridData 
   * @returns 
   */
  private createRouteDetailHotelObject(gridData): IRouteDetail  {
    const routeDetail: IRouteDetail = {
      routeDetailId: null,
      beanKindDiv: gridData.beanKindDiv,
      routeDetailHotel: {
        hotelId: gridData.hotelId,
        hotel: {
          hotelName: gridData.spotName,
        }
      }
    };

    return routeDetail;
  }

  /**
   * グリッドで選択された行データから「ルート詳細アクティビティ」オブジェクトに作成します。
   * @param gridData 
   * @returns 
   */
  private createRouteDetailActivityObject(gridData): IRouteDetail  {
    const routeDetail: IRouteDetail = {
      routeDetailId: null,
      beanKindDiv: gridData.beanKindDiv,
      routeDetailActivity: {
        activityId: gridData.activityId,
        activity: {
          activityName: gridData.spotName,
          activityOpenTimeHours: gridData.openTimeHour,
          activityOpenTimeMinutes: gridData.openTimeMinute,
          activityCloseTimeHours: gridData.closeTimeHour,
          activityCloseTimeMinutes: gridData.closeTimeMinute,
        }
      }
    };

    return routeDetail;
  }

  /**
   * スポット選択モーダルの追加ボタンが押下された際に呼び出され、チェックボックスを選択したスポット詳細配列を返却します。
   * @returns
   */
  public getSelectSpot(): IRouteDetail[] {
    const routeDetails: IRouteDetail[] = this.createRouteObject();

    // チェックボックスが一つも選択されていない場合
    if (routeDetails.length === 0) {
      this.selectModal.show('ルートに追加するスポットが１つも選択されていません。', true).then(() => {
        // 何もしない
      });
    }

    return  routeDetails;
  }

}
