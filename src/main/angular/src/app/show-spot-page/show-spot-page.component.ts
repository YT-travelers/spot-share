import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowSpotPageService } from './show-spot-page.service';
import { Spot } from '../entity/spot';

@Component({
  selector: 'show-spot-page',
  templateUrl: './show-spot-page.component.html',
  styleUrls: ['./show-spot-page.component.scss']
})
export class ShowSpotPageComponent {

  /** グリッド列定義 */
  columnDefs = [
    {headerName: 'ルート番号', field: 'routetNumber', sortable: true, filter: true },
    {headerName: 'スケジュール日時', field: 'scheduleDateTime', sortable: true, filter: true },
    {headerName: '国', field: 'country', sortable: true, filter: true}
  ];

  /** スポット一覧（グリッド表示用データ） */
  spotList: Spot[] = [];
  
  /** 検索キーワード */ 
  searchKeyword = new FormControl('');

  constructor(private service: ShowSpotPageService) {
  }

  /**
   * 検索ボタン押下イベント
   */
  onClickSearch() {
    this.service.searchSpots(this.searchKeyword.value).subscribe(result => {
      this.spotList = result;
    });
  }
}

