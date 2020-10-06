/**
 * ルート詳細
 */
export interface IRouteDetail {
  /** ルート詳細ID */
  routeDetailId: number;
  /** スポットID */
  spotId?: number;
  /** ルート番号 */
  orderNumber?: number;
  /** スケジュール日時 */
  scheduledDateTime?: string;
  /** 行きたい度 */
  favoritePoint?: string;
  /** メモ */
  memo?: string;
}