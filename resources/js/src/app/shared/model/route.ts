import { IRouteDetail } from './route-detail';

/**
 * ルート
 */
export interface IRoute {
  /** ルートID */
  routeId?: number;
  /** ルート名 */
  routeName?: string;
  /** ルート詳細 */
  routeDetails?: IRouteDetail[];
}
