import { Spot } from './spot';

export interface RouteDetail {
  /** ルート詳細ID */
  routeDetailId: number;
  /** ルート名 */
  spot: Spot;
}