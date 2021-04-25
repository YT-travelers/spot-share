/**
 * ルート詳細食事
 */
export interface IRouteDetailMeal {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** 所要時間 */
  mealMinutes?: number;
  /** 食事種類区分 */
  mealKindDiv?: number;
  /** 食事種類名称 */
  mealKindDivName?: string;
  /** 食事費用 */
  mealCost?: number;
}