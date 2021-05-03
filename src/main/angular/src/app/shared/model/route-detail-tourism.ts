import { ITourism } from "./tourism";

/**
 * ルート詳細観光地
 */
export interface IRouteDetailTourism {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** 観光地ID */
  tourismId?: number;
  /** 行きたい度 */
  tourismRate?: number;
  /** 観光時間 */
  tourismMinutes?: number;
  /** 観光費用 */
  tourismCost?: number;
  /** 観光地 */
  tourism?: ITourism;
}