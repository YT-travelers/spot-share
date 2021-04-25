/**
 * ルート詳細移動
 */
export interface IRouteDetailMove {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** 所要時間 */
  moveMinutes?: number;
  /** 移動種類区分 */
  moveWayDiv?: number;
  /** 移動種類名称 */
  moveWayDivName?: string;
  /** 移動費用 */
  moveCost?: number;
}