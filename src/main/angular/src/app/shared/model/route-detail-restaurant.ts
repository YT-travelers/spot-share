import { IRestaurant } from './restaurant';

/**
 * ルート詳細飲食店
 */
export interface IRouteDetailRestaurant {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** 飲食店ID */
  restaurantId?: number;
  /** 行きたい度 */
  restaurantRate?: number;
  /** 飲食時間 */
  restaurantMinutes?: number;
  /** 食事種類区分 */
  restaurantMealKindDiv?: number;
  /** 食事種類区分名称 */
  restaurantMealKindDivName?: string;
  /** 飲食費用 */
  restaurantCost?: number;
  /** 飲食店 */
  restaurant?: IRestaurant;
}
