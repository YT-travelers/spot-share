/**
 * ルート詳細食事
 */
export interface IRouteDetailMeal {
  /** ルート詳細ID */
  routeDetailId?
  /** 所要時間 */				
  mealMinutes?
  /** 食事種類区分 */
  mealKindDiv?
  /** 食事種類名称 */
  mealKindDivName?
  /** 食事費用 */
  mealCost?
}