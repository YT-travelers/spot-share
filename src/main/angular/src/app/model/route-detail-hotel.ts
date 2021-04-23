import { IHotel } from "./hotel";

/**
 * ルート詳細ホテル
 */
export interface IRouteDetailHotel {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** ホテルID */
  hotelId?: number;
  /** 行きたい度 */
  hotelRate?: number;
  /** 滞在時間 */
  hotelMinutes?: number;
  /** チェックイン時間 */
  hotelCheckInTime?: string;
  /** チェックアウト時間 */
  hotelCheckOutTime?: string;
  /** 朝食有無区分 */
  hotelBreakfastYesNoDiv?: number;
  /** 朝食有無区分名称 */
  hotelBreakfastYesNoDivName?: string;
  /** 夕食有無区分 */
  hotelDinnerYesNoDiv?: number;
  /** 夕食有無区分名称 */
  hotelDinnerYesNoDivName?: string;
  /** 宿泊費用 */
  hotelCost?: number;
  /** ホテル */
  hotel?: IHotel;
}