import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ITourism } from '../model/tourism';

@Injectable({ providedIn: 'root' })
export class TourismService {

  private url = 'api/tourisms'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * スポット新規作成
   * @param tourism スポット情報
   */
  createTourism(tourism: ITourism): Observable<ITourism> {
    return this.http.post<ITourism>(this.url, tourism);
  }

  /**
   * スポット更新
   * @param tourism スポット情報
   */
  updateTourism(tourism: ITourism, id: string): Observable<ITourism> {
    return this.http.patch<ITourism>(this.url + '/' + id, tourism);
  }

  /**
   * スポット削除
   * @param id スポット番号
   */
  deleteTourism(id: string): Observable<ITourism> {
    return this.http.delete<ITourism>(this.url + '/' + id);
  }

  /**
   * スポット１件取得
   * @param id スポット番号
   */
  getTourism(id: string): Observable<ITourism> {
    return this.http.get<ITourism>(this.url + '/' + id);
  }

  /**
   * スポット検索処理
   */
  searchTourisms(): Observable<ITourism[]> {
    return this.http.get<ITourism[]>(this.url);
  }
}