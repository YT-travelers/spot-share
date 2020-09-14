import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Spot } from '../entity/spot';

@Injectable({ providedIn: 'root' })
export class SpotService {

  private url = 'api/spots'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * スポット新規作成
   * @param spot スポット情報
   */
  createSpot(spot: Spot): Observable<Spot> {
    return this.http.post<Spot>(this.url, spot)
      .pipe(
        catchError(this.handleError<Spot>(null))
      );
  }

  /**
   * スポット更新
   * @param spot スポット情報
   */
  updateSpot(spot: Spot, id: string): Observable<Spot> {
    return this.http.patch<Spot>(this.url + '/' + id, spot)
      .pipe(
        catchError(this.handleError<Spot>(null))
      );
  }

  /**
   * スポット削除
   * @param id スポット番号
   */
  deleteSpot(id: string): Observable<Spot> {
    return this.http.delete<Spot>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError<Spot>(null))
      );
  }

  /**
   * スポット１件取得
   * @param id スポット番号
   */
  getSpot(id: string): Observable<Spot> {
    return this.http.get<Spot>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError<Spot>(null))
      );
  }

  /**
   * スポット検索処理
   */
  searchSpots(): Observable<Spot[]> {
    return this.http.get<Spot[]>(this.url)
      .pipe(
        catchError(this.handleError<Spot[]>([]))
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