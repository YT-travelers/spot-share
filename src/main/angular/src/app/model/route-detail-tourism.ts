import { ITourism } from "./tourism";

/**
 * ルート詳細チェックリスト
 */
export interface IRouteDetailTourism {
  /** ルート詳細ID */
  routeDetailId: string;
  /** 観光地ID */
  tourismId: string;
  /** 行きたい度 */
  tourismRate: string;
  /** 観光時間 */
  tourismMinutes: string;
  /** 観光費用 */
  tourismCost: string;
  /** 観光地 */
  tourism: ITourism;
}