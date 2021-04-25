/**
 * ルート詳細チェックリスト
 */
export interface IRouteDetailChecklist {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** チェック状態 */
  checkStatus?: string;
  /** チェック内容 */
  checkContent?: string;
}