import { Component, OnInit } from '@angular/core';
import { Spot } from '../entity/spot';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-create-route-page',
  templateUrl: './create-route-page.component.html',
  styleUrls: ['./create-route-page.component.scss']
})
export class CreateRoutePageComponent implements OnInit {

  /** グリッド列定義 */
  columnDefs = [
    { headerName: 'ルート番号', field: 'routetNumber', sortable: true, filter: true },
    { headerName: 'スケジュール日時', field: 'scheduleDateTime', sortable: true, filter: true },
    { headerName: '国', field: 'country', sortable: true, filter: true }
  ];

  /** グリッドオプション */
  gridOptions: GridOptions = <GridOptions> {
    localeText: { noRowsToShow: '表示するデータがありません。' }
  };

  /** スポット一覧（グリッド表示用データ） */
  spotList: Spot[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
