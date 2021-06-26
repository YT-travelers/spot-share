import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IActivity } from 'src/app/shared/model/activity';

@Injectable({ providedIn: 'root' })
export class ActivityService {

  private url = 'api/activities';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * アクティビティ新規作成
   * @param activity アクティビティ情報
   */
  createActivity(activity: IActivity): Observable<IActivity> {
    return this.http.post<IActivity>(this.url, activity);
  }

  /**
   * アクティビティ更新
   * @param activity アクティビティ情報
   */
  updateActivity(activity: IActivity, id: string): Observable<IActivity> {
    return this.http.patch<IActivity>(this.url + '/' + id, activity);
  }

  /**
   * アクティビティ削除
   * @param id アクティビティ番号
   */
  deleteActivity(id: string): Observable<IActivity> {
    return this.http.delete<IActivity>(this.url + '/' + id);
  }

  /**
   * アクティビティ１件取得
   * @param id アクティビティ番号
   */
  getActivity(id: string): Observable<IActivity> {
    return this.http.get<IActivity>(this.url + '/' + id);
  }

  /**
   * アクティビティ検索処理
   */
  searchActivitys(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.url);
  }
}
