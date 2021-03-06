import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IRoute } from '../model/route';

@Injectable({ providedIn: 'root' })
export class RouteService {

  private url = 'api/routes'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * ルート新規作成
   * @param route ルート情報
   */
  createRoute(route: IRoute): Observable<IRoute> {
    return this.http.post<IRoute>(this.url, route);
  }

  /**
   * ルート更新
   * @param route ルート情報
   */
  updateRoute(route: IRoute, id: number): Observable<IRoute> {
    return this.http.patch<IRoute>(this.url + '/' + id, route);
  }

  /**
   * ルート削除
   * @param id ルート番号
   */
  deleteRoute(id: number): Observable<IRoute> {
    return this.http.delete<IRoute>(this.url + '/' + id);
  }

  /**
   * ルート取得
   * @param id ルート番号
   */
  getRoute(id: string): Observable<IRoute> {
    return this.http.get<IRoute>(this.url + '/' + id);
  }

  /**
   * ルート検索処理
   */
  searchRoutes(): Observable<IRoute[]> {
    return this.http.get<IRoute[]>(this.url);
  }

}