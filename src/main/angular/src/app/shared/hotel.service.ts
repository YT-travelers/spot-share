// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';

// import { IHotel } from '../model/hotel';

// @Injectable({ providedIn: 'root' })
// export class HotelService {

//   private url = 'api/hotels'

//   httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };

//   constructor(private http: HttpClient) {
//   }

//   /**
//    * ホテル新規作成
//    * @param hotel ホテル情報
//    */
//   createHotel(hotel: IHotel): Observable<IHotel> {
//     return this.http.post<IHotel>(this.url, hotel);
//   }

//   /**
//    * ホテル更新
//    * @param hotel ホテル情報
//    */
//   updateHotel(hotel: IHotel, id: string): Observable<IHotel> {
//     return this.http.patch<IHotel>(this.url + '/' + id, hotel);
//   }

//   /**
//    * ホテル削除
//    * @param id ホテル番号
//    */
//   deleteHotel(id: string): Observable<IHotel> {
//     return this.http.delete<IHotel>(this.url + '/' + id);
//   }

//   /**
//    * ホテル１件取得
//    * @param id ホテル番号
//    */
//   getHotel(id: string): Observable<IHotel> {
//     return this.http.get<IHotel>(this.url + '/' + id);
//   }

//   /**
//    * ホテル検索処理
//    */
//   searchHotels(): Observable<IHotel[]> {
//     return this.http.get<IHotel[]>(this.url);
//   }
// }