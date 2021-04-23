/**
 * ホテル
 */
export interface IHotel {
  /** ホテルID */
  hotelId?: string;
  /** ホテル名称 */
  hotelName?: string;
  /** ホテル種類区分 */
  hotelKindDiv?: string;
  /** ホテル種類区分名称 */
  hotelKindDivName?: string;
  /** 概要 */
  hotelSummary?: string;
  /** 住所 */
  hotelAddress?: string;
  /** URL */
  tourismUrl?: string;
}