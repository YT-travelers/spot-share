import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ISpot } from '../model/spot';

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
  createSpot(spot: ISpot): Observable<ISpot> {
    return this.http.post<ISpot>(this.url, spot)
      .pipe(
        catchError(this.handleError<ISpot>(null))
      );
  }

  /**
   * スポット更新
   * @param spot スポット情報
   */
  updateSpot(spot: ISpot, id: string): Observable<ISpot> {
    return this.http.patch<ISpot>(this.url + '/' + id, spot)
      .pipe(
        catchError(this.handleError<ISpot>(null))
      );
  }

  /**
   * スポット削除
   * @param id スポット番号
   */
  deleteSpot(id: string): Observable<ISpot> {
    return this.http.delete<ISpot>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError<ISpot>(null))
      );
  }

  /**
   * スポット１件取得
   * @param id スポット番号
   */
  getSpot(id: string): Observable<ISpot> {
    return this.http.get<ISpot>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError<ISpot>(null))
      );
  }

  /**
   * スポット検索処理
   */
  searchSpots(): Observable<ISpot[]> {
    return this.http.get<ISpot[]>(this.url)
      .pipe(
        catchError(this.handleError<ISpot[]>([]))
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