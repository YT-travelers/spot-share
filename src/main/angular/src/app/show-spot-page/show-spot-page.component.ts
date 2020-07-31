import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { GridOptions } from 'ag-grid-community';
import { Spot } from '../entity/spot';
import { SpotService } from '../shared/spot.service'

@Component({
  selector: 'show-spot-page',
  templateUrl: './show-spot-page.component.html',
  styleUrls: ['./show-spot-page.component.scss']
})
export class ShowSpotPageComponent implements OnInit {

  /** グリッド列定義 */
  columnDefs = [
    {headerName: 'ルート番号', field: 'routetNumber', sortable: true, filter: true },
    {headerName: 'スケジュール日時', field: 'scheduleDateTime', sortable: true, filter: true },
    {headerName: '国', field: 'country', sortable: true, filter: true}
  ];

  gridOptions: GridOptions = <GridOptions> {
    localeText: {noRowsToShow: '表示するデータがありません。'}
};

  /** ローディングオーバーレイ */
  overlayRef;

  /** スポット一覧（グリッド表示用データ） */
  spotList: Spot[] = [];
  
  /** 検索キーワード */ 
  searchKeyword = new FormControl('');

  constructor(
    private service: SpotService,
    private router: Router,
    private overlay: Overlay,
  ) {}

  ngOnInit() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    this.executeSearch();
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
   * 検索処理を実行します。
   */
  executeSearch() {
    // ローディング開始
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
    this.service.searchSpots(this.searchKeyword.value).subscribe(result => {
      this.spotList = result;
      // ローディング終了
      this.overlayRef.detach();
    });
  }
}

