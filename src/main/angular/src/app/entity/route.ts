import { RouteDetail } from './route-detail';

export interface Route {
  /** ルートID */
  routeId?: number;
  /** ルート名 */
  routeName?: string;
  /** ルート詳細 */
  routeDetail?: RouteDetail[];
}