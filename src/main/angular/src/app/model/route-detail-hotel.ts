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
  /** チェックイン時間（時） */
  hotelCheckInTimeHours?: string;
  /** チェックイン時間（分） */
  hotelCheckInTimeMinutes?: string;
  /** チェックアウト時間（時） */
  hotelCheckOutTimeHours?: string;
  /** チェックアウト時間（分） */
  hotelCheckOutTimeMinutes?: string;
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