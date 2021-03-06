import { IRouteDetailTourism } from './route-detail-tourism';
import { IRouteDetailRestaurant } from './route-detail-restaurant';
import { IRouteDetailHotel } from './route-detail-hotel';
import { IRouteDetailActivity } from './route-detail-activity';
import { IRouteDetailMeal } from './route-detail-meal';
import { IRouteDetailMove } from './route-detail-move';
import { IRouteDetailChecklist } from './route-detail-checklist';
import { IRouteDetailMemo } from './route-detail-memo';
import { IRouteDetailTime } from './route-detail-time';

/**
 * ルート詳細
 */
export interface IRouteDetail {
  /** ルート詳細ID */
  routeDetailId?: number;
  /** ルートID */
  routeId?: number;
  /** ビーン種類区分 */
  beanKindDiv?: number;
  /** 削除リクエストフラグ */
  deleteRequestFlg?: string;
  /** ルート詳細 観光地 */
  routeDetailTourism?: IRouteDetailTourism;
  /** ルート詳細 飲食店 */
  routeDetailRestaurant?: IRouteDetailRestaurant;
  /** ルート詳細 ホテル */
  routeDetailHotel?: IRouteDetailHotel;
  /** ルート詳細 アクティビティ */
  routeDetailActivity?: IRouteDetailActivity;
  /** ルート詳細 食事 */
  routeDetailMeal?: IRouteDetailMeal;
  /** ルート詳細 移動 */
  routeDetailMove?: IRouteDetailMove;
  /** ルート詳細 時間 */
  routeDetailTime?: IRouteDetailTime;
  /** ルート詳細 チェックリスト */
  routeDetailChecklist?: IRouteDetailChecklist;
  /** ルート詳細 メモ */
  routeDetailMemo?: IRouteDetailMemo;
}
