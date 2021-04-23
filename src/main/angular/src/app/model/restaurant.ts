/**
 * 飲食店
 */
export interface IRestaurant {
  /** 飲食店ID */
  restaurantId?: number;
  /** 飲食店名称 */
  restaurantName?: string;
  /** 料理ジャンル区分 */
  cuisineGenreDiv?: number;
  /** 料理ジャンル区分名称 */
  cuisineGenreDivName?: string;
  /** 飲食店種類区分 */
  restaurantKindDiv?: number;
  /** 飲食店種類区分名称 */
  restaurantKindDivName?: string;
  /** 営業開始時間 */
  restaurantOpenTime?: string;
  /** 営業終了時間 */
  restaurantCloseTime?: string;
  /** 住所 */
  restaurantAddress?: string;
  /** URL */
  restaurantUrl?: string;
}