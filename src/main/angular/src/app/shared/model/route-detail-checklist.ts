/**
 * ルート詳細チェックリスト
 */
export interface IRouteDetailChecklist {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** チェック状態 */
  checkStatus?: number;
  /** チェック内容 */
  checkContent?: string;
}