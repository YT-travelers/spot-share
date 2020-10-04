import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Route } from '../entity/route';

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
  createRoute(spots: number[]): Observable<Route> {
    return this.http.post<Route>(this.url, spots)
      .pipe(
        catchError(this.handleError<Route>(null))
      );
  }

  /**
   * ルート更新
   * @param route ルート情報
   */
  updateRoute(spots: number[], id: number): Observable<Route> {
    return this.http.patch<Route>(this.url + '/' + id, spots)
      .pipe(
        catchError(this.handleError<Route>(null))
      );
  }

  /**
   * ルート削除
   * @param id ルート番号
   */
  deleteRoute(id: number): Observable<Route> {
    return this.http.delete<Route>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError<Route>(null))
      );
  }

  /**
   * ルート取得
   * @param id ルート番号
   */
  getRoute(id: number): Observable<Route> {
    return this.http.get<Route>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError<Route>(null))
      );
  }

  /**
   * ルート検索処理
   */
  searchRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.url)
      .pipe(
        catchError(this.handleError<Route[]>([]))
      );
  }

  /**
   * エラーハンドリング
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}