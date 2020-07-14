import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'add-spot-page',
  templateUrl: './add-spot-page.component.html',
  styleUrls: ['./add-spot-page.component.scss']
})
export class AddSpotPageComponent {

  addSpotFormGroup = new FormGroup({
    /** ルート番号 */ 
    routeNumber: new FormControl(''),
    /** スケジュール日時 */
    scheduleDateTime: new FormControl(''),
    /** 国 */
    country: new FormControl(''),
  });

  /**
   * 保存ボタン押下イベント
   */
  onClickSave() {
    console.log(this.addSpotFormGroup.value.country);
  }
}
