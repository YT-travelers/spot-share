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

  createSpot(spot: Spot): Observable<Spot> {
    return this.http.post<Spot>(this.url, spot)
      .pipe(
        catchError(this.handleError<Spot>(null))
      );
  }

  /**
   * スポット検索処理
   * @param searchKeyword 検索キーワード
   */
  searchSpots(searchKeyword: string): Observable<Spot[]> {
    // TODO API方式仕様とエンティティ定義が確定したら、検索条件組み立て処理を実装する。
    const reqUrl = searchKeyword ? this.url + '?country=' + searchKeyword : this.url;
    return this.http.get<Spot[]>(reqUrl)
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