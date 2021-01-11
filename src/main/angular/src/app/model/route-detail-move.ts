/**
 * ルート詳細移動
 */
export interface IRouteDetailMove {
  /** ルート詳細ID */
  routeDetailId?
  /** 所要時間 */				
  moveMinutes?
  /** 移動種類区分 */
  moveWayDiv?
  /** 移動種類名称 */
  moveWayDivName?
  /** 移動費用 */
  moveCost?
}