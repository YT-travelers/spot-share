import { IActivity } from './activity';

/**
 * ルート詳細アクティビティ
 */
export interface IRouteDetailActivity {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** アクティビティID */
  activityId?: number;
  /** 行きたい度 */
  activityRate?: number;
  /** 所要時間 */
  activityMinutes?: number;
  /** アクティビティ費用 */
  activityCost?: number;
  /** アクティビティ */
  activity?: IActivity;
}
