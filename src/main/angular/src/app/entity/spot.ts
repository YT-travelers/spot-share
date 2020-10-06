export interface Spot {
  /** スポットID */
  spotId: number;
  /** 画像パス */
  imagePath: string;
  /** ルート番号 */
  routeNumber: number;
  /** スケジュール日時 */
  scheduleDateTime: string;
  /** 国 */
  country: string;
  /**  スポット名称 */
  spotName: string;
  /** 費用（予算） */
  costExpectation: number;
  /** 所要時間（予想） */
  requiredTimeExpectation: number;
  /** 行きたい度 */
  favoritePoint: number;
  /** 参考url */
  url: string;
  /** 備考 */
  remark: string;
  /** 作成日付 */
  createDateTime: string;
  /** 更新日付 */
  updateDateTime: string;
}