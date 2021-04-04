import { ICountry } from "./country";

/**
 * 観光地
 */
export interface ITourism {
  /** 観光地ID */
  tourismId?: number;
  /**  観光地名称 */
  tourismName?: string;
  /** 国 */
  country?: ICountry;
  /** 営業開始時間 */
  tourismOpenTime?: string;
  /** 営業終了時間 */
  tourismCloseTime?: string;
  /** 観光地概要 */
  tourismSummary?: string;
  /** 住所 */
  tourismAddress?: string;
  /** URL */
  tourismUrl?: string;
}