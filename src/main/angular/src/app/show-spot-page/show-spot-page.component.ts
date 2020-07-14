import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'show-spot-page',
  templateUrl: './show-spot-page.component.html',
  styleUrls: ['./show-spot-page.component.scss']
})
export class ShowSpotPageComponent {
  
  /** 検索キーワード */ 
  searchKeyword = new FormControl('');

  columnDefs = [
    {headerName: 'ルート番号', field: 'routetNumber', sortable: true, filter: true },
    {headerName: 'スケジュール日時', field: 'scheduleDateTime', sortable: true, filter: true },
    {headerName: '国', field: 'country', sortable: true, filter: true}
  ];

  rowData = [
    { routetNumber: '1', scheduleDateTime: '2020/01/01', country: '日本' },
    { routetNumber: '2', scheduleDateTime: '2020/01/02', country: 'インド' },
    { routetNumber: '3', scheduleDateTime: '2020/01/03', country: 'トルコ' }
  ];

  /**
   * 検索ボタン押下イベント
   */
  onClickSearch() {
    console.log(this.searchKeyword.value);
  }
}

