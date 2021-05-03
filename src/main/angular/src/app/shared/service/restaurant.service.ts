import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRestaurant } from 'src/app/shared/model/restaurant';

@Injectable({ providedIn: 'root' })
export class RestaurantService {

  private url = 'api/restaurants'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * 飲食店新規作成
   * @param restaurant 飲食店情報
   */
  createRestaurant(restaurant: IRestaurant): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(this.url, restaurant);
  }

  /**
   * 飲食店更新
   * @param restaurant 飲食店情報
   */
  updateRestaurant(restaurant: IRestaurant, id: string): Observable<IRestaurant> {
    return this.http.patch<IRestaurant>(this.url + '/' + id, restaurant);
  }

  /**
   * 飲食店削除
   * @param id 飲食店番号
   */
  deleteRestaurant(id: string): Observable<IRestaurant> {
    return this.http.delete<IRestaurant>(this.url + '/' + id);
  }

  /**
   * 飲食店１件取得
   * @param id 飲食店番号
   */
  getRestaurant(id: string): Observable<IRestaurant> {
    return this.http.get<IRestaurant>(this.url + '/' + id);
  }

  /**
   * 飲食店検索処理
   */
  searchRestaurants(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(this.url);
  }
}