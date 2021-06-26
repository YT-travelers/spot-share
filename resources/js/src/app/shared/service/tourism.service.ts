import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ITourism } from 'src/app/shared/model/tourism';

@Injectable({ providedIn: 'root' })
export class TourismService {

  private url = 'api/tourisms';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * 観光地新規作成
   * @param tourism 観光地情報
   */
  createTourism(tourism: ITourism): Observable<ITourism> {
    return this.http.post<ITourism>(this.url, tourism);
  }

  /**
   * 観光地更新
   * @param tourism 観光地情報
   */
  updateTourism(tourism: ITourism, id: string): Observable<ITourism> {
    return this.http.patch<ITourism>(this.url + '/' + id, tourism);
  }

  /**
   * 観光地削除
   * @param id 観光地番号
   */
  deleteTourism(id: string): Observable<ITourism> {
    return this.http.delete<ITourism>(this.url + '/' + id);
  }

  /**
   * 観光地１件取得
   * @param id 観光地番号
   */
  getTourism(id: string): Observable<ITourism> {
    return this.http.get<ITourism>(this.url + '/' + id);
  }

  /**
   * 観光地検索処理
   */
  searchTourisms(): Observable<ITourism[]> {
    return this.http.get<ITourism[]>(this.url);
  }
}
