/**
 * ホテル
 */
export interface IHotel {
  /** ホテルID */
  hotelId?: number;
  /** ホテル名称 */
  hotelName?: string;
  /** ホテル種類区分 */
  hotelKindDiv?: number;
  /** ホテル種類区分名称 */
  hotelKindDivName?: string;
  /** 概要 */
  hotelSummary?: string;
  /** 住所 */
  hotelAddress?: string;
  /** URL */
  hotelUrl?: string;
}
